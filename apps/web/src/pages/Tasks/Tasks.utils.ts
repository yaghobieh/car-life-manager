import type { Task, TaskGroupId } from '@clm/shared';
import { TASK_COLUMN_DEFS, TASK_GROUP_ORDER } from './Tasks.const';

export function taskColumns(t: (key: string) => string) {
  return TASK_COLUMN_DEFS.map((column) => ({
    id: column.id,
    accessor: column.accessor,
    header: t(column.headerKey),
  }));
}

export function flattenGroupedTasks(groups: Record<TaskGroupId, Task[]>): Task[] {
  return TASK_GROUP_ORDER.flatMap((groupId) => groups[groupId]);
}
