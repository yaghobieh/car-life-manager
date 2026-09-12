import {
  buildTimeline,
  generateRecallTasks,
  generateVehicleTasks,
  isValidRegistrationNumber,
  normalizeRegistrationNumber,
  summarizeExpenses,
  type Expense,
  type ServiceAnswer,
  type VehicleLookupResult,
  type VehicleRecall,
} from "@clm/shared";
import { DOCUMENT_STORAGE_MANUAL, HTTP_CONFLICT, HTTP_NOT_FOUND } from "../../constants/http.const";
import { prisma } from "../../db";
import { HttpError } from "../../errors/http-error";
import { config, isDevelopment } from "../../config";
import { resolveDocumentStorage, storageForKey } from "../../storage/resolve-storage";
import { documentObjectKey, parseDocumentFile } from "./documents.utils";
import {
  DOCUMENT_FILE_MISSING_CODE,
  DOCUMENT_FILE_MISSING_MESSAGE,
  PLATE_TAKEN_CODE,
  PLATE_TAKEN_MESSAGE,
} from "./vehicles.const";
import type { AddDocumentInput, StoredDocumentFile } from "./vehicles.types";
import { audit } from "../../db/handlers/audit.handler";
import { lookupOfficialVehicle, MinistryTransportError } from "../../integrations/ministry-of-transport/client";
import { fetchOutstandingRecalls } from "../../integrations/ministry-of-transport/recalls.client";
import { RECALL_CACHE_SOURCE } from "../../integrations/ministry-of-transport/ministry.const";
import { developmentVehicle } from "../../integrations/ministry-of-transport/development-adapter";
import { listReadyServices } from "../../integrations/providers";
import {
  CONNECTION_NOT_CONNECTED,
  CONNECTION_UNKNOWN,
  CONNECTION_USER_CONFIRMED,
  SERVICE_ANSWER_NO,
  SERVICE_ANSWER_UNSURE,
  SERVICE_ANSWER_YES,
  SERVICE_SOURCE_USER,
} from "../../integrations/providers/providers.const";
import { queueDueReminders, queueReminderCreated } from "../../notifications/service";
import {
  serializeDocument,
  serializeExpense,
  serializeMaintenance,
  serializeReminder,
  serializeTask,
  serializeVehicle,
} from "./serialize";

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
    return withRecalls(JSON.parse(cached.payload) as VehicleLookupResult);
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
    where: { registrationNumber: plate },
  });
  if (existing && existing.userId === userId) {
    return { vehicle: serializeVehicle(existing), created: false };
  }
  if (existing) {
    throw new HttpError(PLATE_TAKEN_MESSAGE, HTTP_CONFLICT, PLATE_TAKEN_CODE);
  }

  const vehicle = await prisma.vehicle.create({
    data: {
      userId,
      ...lookup.vehicle,
      dataSourceUpdatedAt: new Date(lookup.vehicle.dataSourceUpdatedAt),
    },
  });

  const generated = generateVehicleTasks({
    vehicle: serializeVehicle(vehicle),
    services: await listReadyServices({
      userId,
      vehicleId: vehicle.id,
      registrationNumber: vehicle.registrationNumber,
    }),
    expenses: [],
    documents: [],
    recalls: lookup.recalls ?? [],
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
  const recalls = await recallsForPlate(vehicle.registrationNumber);
  await persistRecallTasks(vehicle.id, recalls);

  const [tasks, expenses, reminders, documents, maintenance, connections] = await Promise.all([
    prisma.task.findMany({ where: { vehicleId }, orderBy: { createdAt: "asc" } }),
    prisma.expense.findMany({ where: { vehicleId }, orderBy: { occurredAt: "desc" } }),
    prisma.reminder.findMany({ where: { vehicleId }, orderBy: { dueDate: "asc" } }),
    prisma.vehicleDocument.findMany({ where: { vehicleId }, orderBy: { createdAt: "desc" } }),
    prisma.maintenanceRecord.findMany({ where: { vehicleId }, orderBy: { serviceDate: "desc" } }),
    prisma.serviceConnection.findMany({ where: { vehicleId } }),
  ]);

  const serializedVehicle = serializeVehicle(vehicle);
  const serializedTasks = tasks.map(serializeTask);
  const serializedDocuments = documents.map(serializeDocument);
  const serializedExpenses = expenses.map(serializeExpense);
  const serializedMaintenance = maintenance.map(serializeMaintenance);
  const serializedReminders = reminders.map(serializeReminder);
  const services = await listReadyServices(
    {
      userId,
      vehicleId: vehicle.id,
      registrationNumber: vehicle.registrationNumber,
    },
    connections.map((row) => ({
      providerId: row.providerId,
      status: row.status,
      note: null,
      source: row.source,
      confirmedByUserAt: row.confirmedByUserAt?.toISOString() ?? null,
    })),
  );

  const payload = {
    vehicle: serializedVehicle,
    tasks: serializedTasks,
    recalls,
    documents: serializedDocuments,
    services,
    expenses: serializedExpenses,
    expenseSummary: summarizeExpenses(serializedExpenses),
    reminders: serializedReminders,
    maintenance: serializedMaintenance,
    timeline: buildTimeline({
      vehicle: serializedVehicle,
      documents: serializedDocuments,
      expenses: serializedExpenses,
      maintenance: serializedMaintenance,
      reminders: serializedReminders,
      tasks: serializedTasks,
      services,
    }),
    identityVerification: {
      status: "unavailable" as const,
      note: "אין ספק אימות זהות מוגדר. לא מתבצע אימות על סמך מספר תעודת זהות בלבד.",
    },
  };
  queueDueReminders(userId, vehicleId);
  return payload;
}

export async function confirmService(userId: string, vehicleId: string, providerId: string, answer: ServiceAnswer) {
  await getOwnedVehicle(userId, vehicleId);
  const mapped = mapServiceAnswer(answer);
  if (!mapped) {
    throw Object.assign(new Error("Answer is invalid"), { status: 400, code: "invalid_answer" });
  }
  const now = new Date();
  const row = await prisma.serviceConnection.upsert({
    where: { vehicleId_providerId: { vehicleId, providerId } },
    create: {
      vehicleId,
      providerId,
      status: mapped.status,
      source: SERVICE_SOURCE_USER,
      confirmedByUserAt: now,
    },
    update: {
      status: mapped.status,
      source: SERVICE_SOURCE_USER,
      confirmedByUserAt: now,
    },
  });
  await audit({ userId, vehicleId, action: "service_confirmed", metadata: { providerId, answer } });
  return row;
}

export async function addMaintenance(
  userId: string,
  vehicleId: string,
  input: { serviceDate: string; serviceType: string; mileage?: number | null; garage?: string | null; cost?: number | null; notes?: string | null; parts?: string | null },
) {
  await getOwnedVehicle(userId, vehicleId);
  const serviceType = input.serviceType.trim();
  if (!input.serviceDate || !serviceType) {
    throw Object.assign(new Error("Maintenance is incomplete"), { status: 400, code: "invalid_maintenance" });
  }
  const row = await prisma.maintenanceRecord.create({
    data: {
      vehicleId,
      serviceDate: input.serviceDate,
      serviceType,
      mileage: input.mileage ?? null,
      garage: input.garage?.trim() || null,
      cost: input.cost ?? null,
      notes: input.notes?.trim() || null,
      parts: input.parts?.trim() || null,
    },
  });
  await audit({ userId, vehicleId, action: "maintenance_created" });
  return serializeMaintenance(row);
}

function mapServiceAnswer(answer: ServiceAnswer): { status: string } | null {
  if (answer === SERVICE_ANSWER_YES) return { status: CONNECTION_USER_CONFIRMED };
  if (answer === SERVICE_ANSWER_NO) return { status: CONNECTION_NOT_CONNECTED };
  if (answer === SERVICE_ANSWER_UNSURE) return { status: CONNECTION_UNKNOWN };
  return null;
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
  if (!Number.isFinite(input.amount) || input.amount <= 0) {
    throw Object.assign(new Error("Amount is invalid"), { status: 400, code: "invalid_amount" });
  }
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

export async function addDocument(
  userId: string,
  vehicleId: string,
  input: AddDocumentInput,
) {
  await getOwnedVehicle(userId, vehicleId);
  const title = input.title.trim();
  if (!title) throw Object.assign(new Error("Title is required"), { status: 400, code: "invalid_title" });
  const file = parseDocumentFile(input.file ?? null);
  const row = await prisma.vehicleDocument.create({
    data: {
      vehicleId,
      type: input.type,
      title,
      notes: input.notes?.trim() || null,
      expiresAt: input.expiresAt || null,
      storageKey: file ? `${userId}/pending` : DOCUMENT_STORAGE_MANUAL,
      originalName: file?.fileName ?? null,
      mimeType: file?.mimeType ?? null,
      fileSize: file?.buffer.length ?? null,
    },
  });
  if (file) {
    const stored = await resolveDocumentStorage().put(documentObjectKey(userId, row.id), file.buffer, file.mimeType);
    await prisma.vehicleDocument.update({
      where: { id: row.id },
      data: { storageKey: stored.key },
    });
    row.storageKey = stored.key;
  }
  await audit({ userId, vehicleId, action: "document_created", metadata: { type: input.type, hasFile: Boolean(file) } });
  return serializeDocument(row);
}

export async function getDocumentFile(userId: string, vehicleId: string, documentId: string): Promise<StoredDocumentFile> {
  await getOwnedVehicle(userId, vehicleId);
  const row = await prisma.vehicleDocument.findFirst({ where: { id: documentId, vehicleId } });
  if (!row || row.storageKey === DOCUMENT_STORAGE_MANUAL || !row.originalName || !row.mimeType) {
    throw new HttpError(DOCUMENT_FILE_MISSING_MESSAGE, HTTP_NOT_FOUND, DOCUMENT_FILE_MISSING_CODE);
  }
  const body = await storageForKey(row.storageKey).get(row.storageKey);
  if (!body) {
    throw new HttpError(DOCUMENT_FILE_MISSING_MESSAGE, HTTP_NOT_FOUND, DOCUMENT_FILE_MISSING_CODE);
  }
  return {
    body,
    mimeType: row.mimeType,
    originalName: row.originalName,
  };
}

export async function addReminder(userId: string, vehicleId: string, input: { title: string; dueDate: string }) {
  await getOwnedVehicle(userId, vehicleId);
  const title = input.title.trim();
  if (!title || !input.dueDate) {
    throw Object.assign(new Error("Reminder is incomplete"), { status: 400, code: "invalid_reminder" });
  }
  const row = await prisma.reminder.create({
    data: {
      vehicleId,
      title,
      dueDate: input.dueDate,
      status: "upcoming",
    },
  });
  await audit({ userId, vehicleId, action: "reminder_created" });
  const reminder = serializeReminder(row);
  queueReminderCreated(userId, { id: row.id, title: row.title, dueDate: row.dueDate, vehicleId });
  queueDueReminders(userId, vehicleId);
  return reminder;
}

export async function removeVehicle(userId: string, vehicleId: string) {
  await getOwnedVehicle(userId, vehicleId);
  await prisma.vehicle.delete({ where: { id: vehicleId } });
  await audit({ userId, vehicleId, action: "vehicle_deleted" });
}

function withRecalls(result: VehicleLookupResult): VehicleLookupResult {
  return { ...result, recalls: result.recalls ?? [] };
}

async function recallsForPlate(registrationNumber: string): Promise<VehicleRecall[]> {
  const plate = normalizeRegistrationNumber(registrationNumber);
  const cached = await prisma.vehicleLookupCache.findFirst({
    where: { registrationNumber: plate, source: RECALL_CACHE_SOURCE, expiresAt: { gt: new Date() } },
    orderBy: { fetchedAt: "desc" },
  });
  if (cached) return JSON.parse(cached.payload) as VehicleRecall[];
  const recalls = await fetchOutstandingRecalls(plate);
  await prisma.vehicleLookupCache.create({
    data: {
      registrationNumber: plate,
      payload: JSON.stringify(recalls),
      source: RECALL_CACHE_SOURCE,
      fetchedAt: new Date(),
      expiresAt: new Date(Date.now() + config.lookupCacheTtlMs),
    },
  });
  return recalls;
}

async function persistRecallTasks(vehicleId: string, recalls: VehicleRecall[]): Promise<void> {
  const generated = generateRecallTasks(vehicleId, recalls);
  for (const item of generated) {
    const existing = await prisma.task.findFirst({ where: { vehicleId, source: item.source } });
    if (existing) continue;
    await prisma.task.create({
      data: {
        vehicleId,
        title: item.title,
        description: item.description,
        category: item.category,
        priority: item.priority,
        status: item.status,
        dueDate: item.dueDate,
        provider: item.provider,
        source: item.source,
        externalUrl: item.externalUrl,
      },
    });
  }
}
