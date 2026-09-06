import type { Task, TaskGroupId } from "./types";

const MS_IN_DAY = 86_400_000;
const DAYS_IN_WEEK = 7;

function daysUntil(iso: string | null, now: Date): number | null {
  if (!iso) return null;
  const target = Date.parse(iso);
  if (Number.isNaN(target)) return null;
  return Math.ceil((target - now.getTime()) / MS_IN_DAY);
}

export function groupTasks(tasks: Task[], now = new Date()): Record<TaskGroupId, Task[]> {
  const groups: Record<TaskGroupId, Task[]> = {
    urgent: [],
    this_week: [],
    later: [],
    completed: [],
  };

  for (const task of tasks) {
    if (task.status === "completed") {
      groups.completed.push(task);
      continue;
    }
    const days = daysUntil(task.dueDate, now);
    const urgent = task.priority === "overdue" || task.status === "needs_attention" || (days !== null && days <= 0);
    if (urgent) {
      groups.urgent.push(task);
      continue;
    }
    if (days !== null && days <= DAYS_IN_WEEK) {
      groups.this_week.push(task);
      continue;
    }
    groups.later.push(task);
  }

  return groups;
}

export function nextTasks(tasks: Task[], limit: number, now = new Date()): Task[] {
  const groups = groupTasks(tasks, now);
  return [...groups.urgent, ...groups.this_week, ...groups.later].slice(0, limit);
}
