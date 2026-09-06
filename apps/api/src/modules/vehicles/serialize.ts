import type { Expense, Reminder, Task, Vehicle } from "@clm/shared";
import type { Expense as ExpenseRow, Reminder as ReminderRow, Task as TaskRow, Vehicle as VehicleRow } from "@prisma/client";

export function serializeVehicle(row: VehicleRow): Vehicle {
  return {
    id: row.id,
    userId: row.userId,
    registrationNumber: row.registrationNumber,
    formattedRegistrationNumber: row.formattedRegistrationNumber,
    make: row.make,
    model: row.model,
    modelYear: row.modelYear,
    fuelType: row.fuelType,
    engine: row.engine,
    color: row.color,
    registrationDate: row.registrationDate,
    registrationExpiry: row.registrationExpiry,
    lastTestDate: row.lastTestDate,
    nextTestDate: row.nextTestDate,
    ownershipSequence: row.ownershipSequence,
    ownershipType: row.ownershipType,
    mileage: row.mileage,
    dataSource: row.dataSource,
    dataProvenance: row.dataProvenance as Vehicle["dataProvenance"],
    dataSourceUpdatedAt: row.dataSourceUpdatedAt.toISOString(),
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export function serializeTask(row: TaskRow): Task {
  return {
    id: row.id,
    vehicleId: row.vehicleId,
    title: row.title,
    description: row.description,
    category: row.category,
    priority: row.priority as Task["priority"],
    status: row.status as Task["status"],
    dueDate: row.dueDate,
    provider: row.provider,
    source: row.source,
    externalUrl: row.externalUrl,
    createdAt: row.createdAt.toISOString(),
    completedAt: row.completedAt?.toISOString() ?? null,
  };
}

export function serializeExpense(row: ExpenseRow): Expense {
  return {
    id: row.id,
    vehicleId: row.vehicleId,
    category: row.category as Expense["category"],
    amount: row.amount,
    currency: "ILS",
    merchant: row.merchant,
    occurredAt: row.occurredAt.toISOString(),
    description: row.description,
    recurring: row.recurring,
    attachmentId: row.attachmentId,
    createdAt: row.createdAt.toISOString(),
  };
}

export function serializeReminder(row: ReminderRow): Reminder {
  return {
    id: row.id,
    vehicleId: row.vehicleId,
    title: row.title,
    dueDate: row.dueDate,
    remindAt: row.remindAt,
    recurrence: row.recurrence,
    status: row.status as Reminder["status"],
    createdAt: row.createdAt.toISOString(),
  };
}
