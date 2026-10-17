import type {
  Expense,
  MaintenanceRecord,
  Reminder,
  ServiceProviderInfo,
  Task,
  TimelineEvent,
  Vehicle,
  VehicleDocument,
} from "./types";

export interface TimelineInput {
  vehicle: Vehicle;
  documents: VehicleDocument[];
  expenses: Expense[];
  maintenance: MaintenanceRecord[];
  reminders: Reminder[];
  tasks: Task[];
  services: ServiceProviderInfo[];
}

export function buildTimeline(input: TimelineInput): TimelineEvent[] {
  const events: TimelineEvent[] = [
    {
      id: `vehicle_${input.vehicle.id}`,
      type: "vehicle_added",
      occurredAt: input.vehicle.createdAt,
      source: input.vehicle.dataProvenance === "official" ? "official" : "user",
      detail: input.vehicle.formattedRegistrationNumber,
    },
  ];

  for (const document of input.documents) {
    events.push({
      id: `document_${document.id}`,
      type: "document_added",
      occurredAt: document.createdAt,
      source: "user",
      detail: document.title,
    });
  }

  for (const expense of input.expenses) {
    events.push({
      id: `expense_${expense.id}`,
      type: "expense_added",
      occurredAt: expense.occurredAt,
      source: "user",
      detail: expense.merchant,
    });
  }

  for (const record of input.maintenance) {
    events.push({
      id: `maintenance_${record.id}`,
      type: "maintenance_added",
      occurredAt: record.serviceDate,
      source: "user",
      detail: record.serviceType,
    });
  }

  for (const reminder of input.reminders) {
    events.push({
      id: `reminder_${reminder.id}`,
      type: "reminder_added",
      occurredAt: reminder.createdAt,
      source: "user",
      detail: reminder.title,
    });
  }

  for (const task of input.tasks) {
    if (!task.completedAt) continue;
    events.push({
      id: `task_${task.id}`,
      type: "task_completed",
      occurredAt: task.completedAt,
      source: "user",
      detail: task.title,
    });
  }

  for (const service of input.services) {
    if (!service.confirmedByUserAt) continue;
    events.push({
      id: `service_${service.providerId}`,
      type: "service_confirmed",
      occurredAt: service.confirmedByUserAt,
      source: "user",
      detail: service.name,
    });
  }

  return events.sort((left, right) => right.occurredAt.localeCompare(left.occurredAt));
}
