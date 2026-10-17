import { buildIcs, type CalendarEvent } from "@clm/shared";
import { prisma } from "../../db";
import { getOwnedVehicle } from "./service";

const CALENDAR_NAME = "Car Life Manager";

function eventFromDate(uid: string, title: string, date: string | null | undefined): CalendarEvent | null {
  if (!date) return null;
  return { uid, title, date, description: title };
}

export async function vehicleCalendarIcs(userId: string, vehicleId: string): Promise<string> {
  const vehicle = await getOwnedVehicle(userId, vehicleId);
  const [reminders, tasks] = await Promise.all([
    prisma.reminder.findMany({ where: { vehicleId }, orderBy: { dueDate: "asc" } }),
    prisma.task.findMany({ where: { vehicleId, dueDate: { not: null } } }),
  ]);
  const events = [
    eventFromDate(`license-${vehicle.id}`, "חידוש רישיון רכב", vehicle.registrationExpiry),
    eventFromDate(`test-${vehicle.id}`, "טסט שנתי", vehicle.nextTestDate),
    ...reminders.map((reminder) => eventFromDate(`reminder-${reminder.id}`, reminder.title, reminder.dueDate)),
    ...tasks.map((task) => eventFromDate(`task-${task.id}`, task.title, task.dueDate)),
  ].filter((event): event is CalendarEvent => Boolean(event));
  return buildIcs(events, `${CALENDAR_NAME} ${vehicle.formattedRegistrationNumber}`);
}
