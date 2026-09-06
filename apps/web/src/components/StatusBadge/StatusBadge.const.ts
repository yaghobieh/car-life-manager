import type { TaskPriority } from '@clm/shared';
import {
  BADGE_DANGER,
  BADGE_NEUTRAL,
  BADGE_SUCCESS,
  BADGE_WARNING,
  TASK_PRIORITY_DONE,
  TASK_PRIORITY_IMPORTANT,
  TASK_PRIORITY_NORMAL,
  TASK_PRIORITY_OVERDUE,
} from '@const';

export const PRIORITY_BADGE_VARIANT: Record<TaskPriority, 'danger' | 'warning' | 'success' | 'neutral'> = {
  [TASK_PRIORITY_OVERDUE]: BADGE_DANGER,
  [TASK_PRIORITY_IMPORTANT]: BADGE_WARNING,
  [TASK_PRIORITY_NORMAL]: BADGE_NEUTRAL,
  [TASK_PRIORITY_DONE]: BADGE_SUCCESS,
};

export const PRIORITY_LABEL_KEY: Record<TaskPriority, string> = {
  [TASK_PRIORITY_OVERDUE]: 'overdue',
  [TASK_PRIORITY_IMPORTANT]: 'important',
  [TASK_PRIORITY_NORMAL]: 'normal',
  [TASK_PRIORITY_DONE]: 'done',
};
