import { describe, expect, it } from 'vitest';
import { ROUTE_REMINDERS } from '@const';
import { reminderEventPath, reminderToCalendarEvent } from './CalendarEvent.utils';

describe('reminderEventPath', () => {
  it('opens the portal event page', () => {
    expect(reminderEventPath('rem-1')).toBe(`${ROUTE_REMINDERS}/rem-1`);
  });
});

describe('reminderToCalendarEvent', () => {
  it('maps a portal reminder to a calendar event', () => {
    expect(reminderToCalendarEvent({
      id: 'rem-1',
      vehicleId: 'v1',
      title: 'Test',
      dueDate: '2026-10-01',
      remindAt: null,
      recurrence: null,
      status: 'upcoming',
      createdAt: '2026-09-10T00:00:00.000Z',
    })).toEqual({
      uid: 'rem-1',
      title: 'Test',
      date: '2026-10-01',
    });
  });
});
