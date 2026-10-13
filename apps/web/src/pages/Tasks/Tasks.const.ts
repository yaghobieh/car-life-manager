import type { TaskGroupId } from '@clm/shared';
import { TASK_GROUP_DONE, TASK_GROUP_LATER, TASK_GROUP_URGENT, TASK_GROUP_WEEK } from '@const';

export const TASK_COLUMN_DEFS = [
  { id: 'title', accessor: 'title', headerKey: 'leftover' },
  { id: 'priority', accessor: 'priority', headerKey: 'priority' },
  { id: 'status', accessor: 'status', headerKey: 'status' },
  { id: 'source', accessor: 'source', headerKey: 'source' },
] as const;

export const TASK_GROUP_ORDER: TaskGroupId[] = [
  TASK_GROUP_URGENT,
  TASK_GROUP_WEEK,
  TASK_GROUP_LATER,
  TASK_GROUP_DONE,
];

export const TASK_GROUP_LABEL_KEY: Record<TaskGroupId, string> = {
  [TASK_GROUP_URGENT]: 'groupUrgent',
  [TASK_GROUP_WEEK]: 'groupWeek',
  [TASK_GROUP_LATER]: 'groupLater',
  [TASK_GROUP_DONE]: 'groupDone',
};
