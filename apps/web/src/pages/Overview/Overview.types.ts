import type { Task } from '@clm/shared';

export interface TaskFilterCounts {
  all: number;
  overdue: number;
  important: number;
}

export type VisibleTask = Task;
