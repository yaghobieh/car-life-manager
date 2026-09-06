import type { Task } from '@clm/shared';
import { TASK_PRIORITY_IMPORTANT, TASK_PRIORITY_OVERDUE } from '@const';
import type { TaskFilterCounts } from './Overview.types';
import { OVERVIEW_DATE_OPTIONS } from './Overview.const';

export function formatOverviewDate(value: string | null, locale: string, unknownLabel: string): string {
  return value ? new Date(value).toLocaleDateString(locale, OVERVIEW_DATE_OPTIONS) : unknownLabel;
}

export function vehicleTitle(make: string | null, model: string | null, unknownLabel: string): string {
  return [make, model].filter(Boolean).join(' ') || unknownLabel;
}

export function vehicleSubtitle(fuelType: string | null, modelYear: number | null, unknownLabel: string): string {
  return [fuelType, modelYear].filter(Boolean).join(' • ') || unknownLabel;
}

export function taskFilterCounts(tasks: Task[]): TaskFilterCounts {
  return {
    all: tasks.length,
    overdue: tasks.filter((task) => task.priority === TASK_PRIORITY_OVERDUE).length,
    important: tasks.filter((task) => task.priority === TASK_PRIORITY_IMPORTANT).length,
  };
}
