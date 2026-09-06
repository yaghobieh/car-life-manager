import {
  catalogWithTimestamp,
  generateVehicleTasks,
  isValidRegistrationNumber,
  normalizeRegistrationNumber,
  summarizeExpenses,
  type Expense,
  type VehicleLookupResult,
} from "@clm/shared";
import { prisma } from "../../db";
import { config, isDevelopment } from "../../config";
import { audit } from "../../audit";
import { lookupOfficialVehicle, MinistryTransportError } from "../../integrations/ministry-of-transport/client";
import { developmentVehicle } from "../../integrations/ministry-of-transport/development-adapter";
import { serializeExpense, serializeReminder, serializeTask, serializeVehicle } from "./serialize";

export async function lookupVehicle(registrationNumber: string): Promise<VehicleLookupResult> {
  if (!isValidRegistrationNumber(registrationNumber)) {
    throw Object.assign(new Error("Invalid registration number"), { status: 400 });
  }

  const plate = normalizeRegistrationNumber(registrationNumber);
  const cached = await prisma.vehicleLookupCache.findFirst({
    where: { registrationNumber: plate, expiresAt: { gt: new Date() } },
    orderBy: { fetchedAt: "desc" },
  });
  if (cached) {
    return JSON.parse(cached.payload) as VehicleLookupResult;
  }

  try {
    const result = await lookupOfficialVehicle(plate);
    await prisma.vehicleLookupCache.create({
      data: {
        registrationNumber: plate,
        payload: JSON.stringify(result),
        source: result.vehicle.dataSource,
        fetchedAt: new Date(),
        expiresAt: new Date(Date.now() + config.lookupCacheTtlMs),
      },
    });
    return result;
  } catch (error) {
    if (error instanceof MinistryTransportError && error.code === "not_found") {
      throw Object.assign(new Error("Vehicle not found"), { status: 404, code: "not_found" });
    }
    if (config.vehicleDataSource === "development" && isDevelopment()) {
      return developmentVehicle(plate);
    }
    const status = error instanceof MinistryTransportError && error.code === "rate_limit" ? 429 : 502;
    throw Object.assign(
      new Error(error instanceof Error ? error.message : "Lookup unavailable"),
      { status, code: error instanceof MinistryTransportError ? error.code : "unavailable" },
    );
  }
}

export async function addVehicle(userId: string, registrationNumber: string) {
  const lookup = await lookupVehicle(registrationNumber);
  const plate = lookup.vehicle.registrationNumber;

  const existing = await prisma.vehicle.findUnique({
    where: { userId_registrationNumber: { userId, registrationNumber: plate } },
  });
  if (existing) return { vehicle: serializeVehicle(existing), created: false };

  const vehicle = await prisma.vehicle.create({
    data: {
      userId,
      ...lookup.vehicle,
      dataSourceUpdatedAt: new Date(lookup.vehicle.dataSourceUpdatedAt),
    },
  });

  const generated = generateVehicleTasks({
    vehicle: serializeVehicle(vehicle),
    services: catalogWithTimestamp(),
    expenses: [],
    documents: [],
  });

  await prisma.task.createMany({
    data: generated.map((item) => ({
      vehicleId: vehicle.id,
      title: item.title,
      description: item.description,
      category: item.category,
      priority: item.priority,
      status: item.status,
      dueDate: item.dueDate,
      provider: item.provider,
      source: item.source,
      externalUrl: item.externalUrl,
      completedAt: item.completedAt ? new Date(item.completedAt) : null,
    })),
  });

  const expiry = lookup.vehicle.registrationExpiry;
  const nextTest = lookup.vehicle.nextTestDate;
  const reminders = [
    expiry ? { title: "חידוש רישיון רכב", dueDate: expiry } : null,
    nextTest ? { title: "טסט שנתי", dueDate: nextTest } : null,
  ].filter((item): item is { title: string; dueDate: string } => Boolean(item));

  if (reminders.length > 0) {
    await prisma.reminder.createMany({
      data: reminders.map((item) => ({
        vehicleId: vehicle.id,
        title: item.title,
        dueDate: item.dueDate,
        status: "upcoming",
      })),
    });
  }

  await audit({ userId, vehicleId: vehicle.id, action: "vehicle_added", metadata: { plate } });
  return { vehicle: serializeVehicle(vehicle), created: true };
}

export async function listVehicles(userId: string) {
  const rows = await prisma.vehicle.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
  return rows.map(serializeVehicle);
}

export async function getOwnedVehicle(userId: string, vehicleId: string) {
  const vehicle = await prisma.vehicle.findFirst({ where: { id: vehicleId, userId } });
  if (!vehicle) throw Object.assign(new Error("Vehicle not found"), { status: 404 });
  return vehicle;
}

export async function getDashboard(userId: string, vehicleId: string) {
  const vehicle = await getOwnedVehicle(userId, vehicleId);
  const [tasks, expenses, reminders] = await Promise.all([
    prisma.task.findMany({ where: { vehicleId }, orderBy: { createdAt: "asc" } }),
    prisma.expense.findMany({ where: { vehicleId }, orderBy: { occurredAt: "desc" } }),
    prisma.reminder.findMany({ where: { vehicleId }, orderBy: { dueDate: "asc" } }),
  ]);

  return {
    vehicle: serializeVehicle(vehicle),
    tasks: tasks.map(serializeTask),
    services: catalogWithTimestamp(),
    expenses: expenses.map(serializeExpense),
    expenseSummary: summarizeExpenses(expenses.map(serializeExpense)),
    reminders: reminders.map(serializeReminder),
    identityVerification: {
      status: "unavailable" as const,
      note: "אין ספק אימות זהות מוגדר. לא מתבצע אימות על סמך מספר תעודת זהות בלבד.",
    },
  };
}

export async function patchTask(userId: string, taskId: string, status: string) {
  const task = await prisma.task.findUnique({ where: { id: taskId } });
  if (!task) throw Object.assign(new Error("Task not found"), { status: 404 });
  await getOwnedVehicle(userId, task.vehicleId);
  const updated = await prisma.task.update({
    where: { id: taskId },
    data: {
      status,
      completedAt: status === "completed" ? new Date() : null,
    },
  });
  await audit({ userId, vehicleId: task.vehicleId, action: "task_updated", metadata: { taskId, status } });
  return serializeTask(updated);
}

export async function addExpense(userId: string, vehicleId: string, input: Omit<Expense, "id" | "createdAt" | "vehicleId">) {
  await getOwnedVehicle(userId, vehicleId);
  const row = await prisma.expense.create({
    data: {
      vehicleId,
      category: input.category,
      amount: input.amount,
      currency: "ILS",
      merchant: input.merchant,
      occurredAt: new Date(input.occurredAt),
      description: input.description,
      recurring: input.recurring,
    },
  });
  await audit({ userId, vehicleId, action: "expense_created" });
  return serializeExpense(row);
}

export async function removeVehicle(userId: string, vehicleId: string) {
  await getOwnedVehicle(userId, vehicleId);
  await prisma.vehicle.delete({ where: { id: vehicleId } });
  await audit({ userId, vehicleId, action: "vehicle_deleted" });
}
