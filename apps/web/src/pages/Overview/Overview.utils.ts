import type { ExpenseSummary, Reminder, Task, Vehicle } from '@clm/shared';
import { SPACE, STATUS_KIND_UNKNOWN, SUBTITLE_SEPARATOR, TASK_PRIORITY_IMPORTANT, TASK_PRIORITY_OVERDUE, ZERO } from '@const';
import type { OverviewView, TaskFilterCounts } from './Overview.types';
import {
  OVERVIEW_DATE_OPTIONS,
  OVERVIEW_VIEW_EMPTY,
  OVERVIEW_VIEW_LOADING,
  OVERVIEW_VIEW_READY,
  STATUS_KIND_COLOR,
} from './Overview.const';

export function formatOverviewDate(value: string | null, locale: string, unknownLabel: string): string {
  return value ? new Date(value).toLocaleDateString(locale, OVERVIEW_DATE_OPTIONS) : unknownLabel;
}

export function vehicleTitle(make: string | null, model: string | null, unknownLabel: string): string {
  return [make, model].filter(Boolean).join(SPACE) || unknownLabel;
}

export function vehicleSubtitle(fuelType: string | null, modelYear: number | null, unknownLabel: string): string {
  return [fuelType, modelYear].filter(Boolean).join(SUBTITLE_SEPARATOR) || unknownLabel;
}

export function taskFilterCounts(tasks: Task[]): TaskFilterCounts {
  return {
    all: tasks.length,
    overdue: tasks.filter((task) => task.priority === TASK_PRIORITY_OVERDUE).length,
    important: tasks.filter((task) => task.priority === TASK_PRIORITY_IMPORTANT).length,
  };
}

export function resolveOverviewView(
  loading: boolean,
  dashboard: unknown,
  vehicles: Vehicle[],
): OverviewView {
  if (loading) return OVERVIEW_VIEW_LOADING;
  if (!dashboard || vehicles.length === ZERO) return OVERVIEW_VIEW_EMPTY;
  return OVERVIEW_VIEW_READY;
}

export function hasExpenseData(summary: ExpenseSummary): boolean {
  return summary.hasData;
}

export function visibleReminders(reminders: Reminder[], limit: number): Reminder[] {
  if (reminders.length === ZERO) return [];
  return reminders.slice(ZERO, limit);
}

export function statusKindColor(kind: string): string {
  return STATUS_KIND_COLOR[kind as keyof typeof STATUS_KIND_COLOR] ?? STATUS_KIND_COLOR[STATUS_KIND_UNKNOWN];
}

export function compareVehicleLabel(vehicle: Vehicle, unknownLabel: string): string {
  return `${vehicle.formattedRegistrationNumber}${SUBTITLE_SEPARATOR}${vehicleTitle(vehicle.make, vehicle.model, unknownLabel)}`;
}

export function compareFieldValue(
  field: string,
  vehicle: Vehicle,
  locale: string,
  unknownLabel: string,
): string {
  if (field === 'plate') return vehicle.formattedRegistrationNumber;
  if (field === 'make') return vehicle.make ?? unknownLabel;
  if (field === 'model') return vehicle.model ?? unknownLabel;
  if (field === 'year') return vehicle.modelYear ? String(vehicle.modelYear) : unknownLabel;
  if (field === 'color') return vehicle.color ?? unknownLabel;
  if (field === 'fuel') return vehicle.fuelType ?? unknownLabel;
  if (field === 'hand') return vehicle.ownershipSequence ? String(vehicle.ownershipSequence) : unknownLabel;
  if (field === 'ownershipType') return vehicle.ownershipType ?? unknownLabel;
  if (field === 'licenseExpiry') return formatOverviewDate(vehicle.registrationExpiry, locale, unknownLabel);
  if (field === 'test') return formatOverviewDate(vehicle.nextTestDate, locale, unknownLabel);
  return unknownLabel;
}
