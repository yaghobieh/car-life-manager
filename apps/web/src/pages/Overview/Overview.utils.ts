import type { ExpenseSummary, Reminder, Task, Vehicle } from '@clm/shared';
import { HOUR_EVENING, HOUR_NOON, SPACE, STATUS_KIND_HEALTHY, STATUS_KIND_UNKNOWN, SUBTITLE_SEPARATOR, TASK_PRIORITY_IMPORTANT, TASK_PRIORITY_OVERDUE, ZERO } from '@const';
import type { ClmTone } from '@common';
import type { OverviewMetaItem, OverviewPillItem, OverviewView, TaskFilterCounts } from './Overview.types';
import {
  KEY_COLOR,
  KEY_HAND,
  KEY_INSURANCE_DISCONNECTED,
  KEY_LICENSE_VALID_SHORT,
  KEY_ROAD_ENTRY,
  KEY_TEST_VALID_SHORT,
  KEY_UNKNOWN,
  OVERVIEW_DATE_OPTIONS,
  OVERVIEW_TONE_BAD,
  OVERVIEW_TONE_GOOD,
  OVERVIEW_VIEW_EMPTY,
  OVERVIEW_VIEW_LOADING,
  OVERVIEW_VIEW_READY,
  STATUS_KIND_COLOR,
} from './Overview.const';

export function toneForKind(kind: string): ClmTone {
  return kind === STATUS_KIND_HEALTHY ? OVERVIEW_TONE_GOOD : OVERVIEW_TONE_BAD;
}

export function buildOverviewPills(
  licenseKind: string,
  testKind: string,
  t: (key: string) => string,
): OverviewPillItem[] {
  return [
    { label: t(KEY_LICENSE_VALID_SHORT), tone: toneForKind(licenseKind) },
    { label: t(KEY_TEST_VALID_SHORT), tone: toneForKind(testKind) },
    { label: t(KEY_INSURANCE_DISCONNECTED), tone: OVERVIEW_TONE_BAD },
  ];
}

export function buildOverviewMeta(
  vehicle: Vehicle,
  locale: string,
  t: (key: string) => string,
): OverviewMetaItem[] {
  const unknown = t(KEY_UNKNOWN);
  return [
    {
      label: t(KEY_HAND),
      value: vehicle.ownershipSequence != null ? String(vehicle.ownershipSequence) : unknown,
    },
    {
      label: t(KEY_COLOR),
      value: vehicle.color ?? unknown,
    },
    {
      label: t(KEY_ROAD_ENTRY),
      value: formatOverviewDate(vehicle.registrationDate, locale, unknown),
    },
  ];
}

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

export function greetingKey(now = new Date()): string {
  const hour = now.getHours();
  if (hour < HOUR_NOON) return 'greetingMorning';
  if (hour < HOUR_EVENING) return 'greetingAfternoon';
  return 'greetingEvening';
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
