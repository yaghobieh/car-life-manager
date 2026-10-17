import type { Task } from '@clm/shared';
import {
  SVG_STATUS_ALERT,
  SVG_STATUS_OK,
  SVG_STATUS_WARN,
  TASK_PRIORITY_DONE,
  TASK_PRIORITY_OVERDUE,
  TASK_STATUS_COMPLETED,
  TASK_STATUS_NEEDS_ATTENTION,
} from '@const';

export function taskStatusIcon(task: Task): string {
  if (task.status === TASK_STATUS_COMPLETED || task.priority === TASK_PRIORITY_DONE) {
    return SVG_STATUS_OK;
  }
  if (task.priority === TASK_PRIORITY_OVERDUE || task.status === TASK_STATUS_NEEDS_ATTENTION) {
    return SVG_STATUS_ALERT;
  }
  return SVG_STATUS_WARN;
}
