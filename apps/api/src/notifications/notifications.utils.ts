import { REMINDER_SCHEDULED_PREFIX, SOURCE_KIND_SCHEDULED, SOURCE_PREFIX_REMINDER, SOURCE_PREFIX_SMS_TEST } from "./notifications.const";
import type { NotificationChannel } from "./notifications.types";

export function reminderSourceKey(reminderId: string, channel: NotificationChannel): string {
  return `${SOURCE_PREFIX_REMINDER}${reminderId}:${channel}`;
}

export function reminderScheduledSourceKey(reminderId: string, channel: NotificationChannel): string {
  return `${SOURCE_PREFIX_REMINDER}${reminderId}:${SOURCE_KIND_SCHEDULED}:${channel}`;
}

export function smsTestSourceKey(sentAt: string): string {
  return `${SOURCE_PREFIX_SMS_TEST}${sentAt}`;
}

export function reminderBody(title: string, dueDate: string): string {
  return `${title} · ${dueDate}`;
}

export function reminderScheduledBody(title: string, dueDate: string): string {
  return `${REMINDER_SCHEDULED_PREFIX}${title} · ${dueDate}`;
}
