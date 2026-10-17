import { SOURCE_PREFIX_REMINDER } from "./notifications.const";
import type { NotificationChannel } from "./notifications.types";

export function reminderSourceKey(reminderId: string, channel: NotificationChannel): string {
  return `${SOURCE_PREFIX_REMINDER}${reminderId}:${channel}`;
}

export function reminderBody(title: string, dueDate: string): string {
  return `${title} · ${dueDate}`;
}
