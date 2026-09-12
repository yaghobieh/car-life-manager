import { buildIcs, type CalendarEvent as SharedCalendarEvent, type Reminder } from '@clm/shared';
import { ROUTE_REMINDERS } from '@const';
import { ICS_FILE_SUFFIX, ICS_MIME } from './CalendarEvent.const';

export function reminderEventPath(reminderId: string): string {
  return `${ROUTE_REMINDERS}/${reminderId}`;
}

export function reminderToCalendarEvent(reminder: Reminder): SharedCalendarEvent {
  return {
    uid: reminder.id,
    title: reminder.title,
    date: reminder.dueDate,
  };
}

export function downloadIcs(events: SharedCalendarEvent[], calendarName: string): void {
  const blob = new Blob([buildIcs(events, calendarName)], { type: ICS_MIME });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${calendarName}${ICS_FILE_SUFFIX}`;
  link.click();
  URL.revokeObjectURL(url);
}
