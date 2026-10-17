import type { Task, TaskGroupId } from '@clm/shared';
import { TASK_GROUP_DONE, TASK_GROUP_LATER, TASK_GROUP_URGENT, TASK_GROUP_WEEK } from '@const';
import { TASK_COLUMN_DEFS } from './Tasks.const';

const TASK_LIST_ORDER: TaskGroupId[] = [TASK_GROUP_URGENT, TASK_GROUP_WEEK, TASK_GROUP_LATER, TASK_GROUP_DONE];

export function taskColumns(t: (key: string) => string) {
  return TASK_COLUMN_DEFS.map((column) => ({
    id: column.id,
    accessor: column.accessor,
    header: t(column.headerKey),
  }));
}

export function flattenGroupedTasks(groups: Record<TaskGroupId, Task[]>): Task[] {
  return TASK_LIST_ORDER.flatMap((groupId) => groups[groupId]);
}
