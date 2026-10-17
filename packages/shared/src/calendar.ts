import {
  GOOGLE_CALENDAR_ACTION,
  GOOGLE_CALENDAR_RENDER_URL,
  ICS_BEGIN_CALENDAR,
  ICS_BEGIN_EVENT,
  ICS_CALSCALE,
  ICS_CRLF,
  ICS_DATE_VALUE,
  ICS_DAY_STEP,
  ICS_END_CALENDAR,
  ICS_END_EVENT,
  ICS_METHOD,
  ICS_PRODID,
  ICS_VERSION_LINE,
  ISO_DATE_LENGTH,
} from "./calendar.const";
import type { CalendarEvent } from "./calendar.types";

export type { CalendarEvent } from "./calendar.types";

export function icsDate(value: string): string {
  return value.slice(0, ISO_DATE_LENGTH).replace(/-/g, "");
}

export function nextIsoDate(value: string): string {
  const date = new Date(`${value.slice(0, ISO_DATE_LENGTH)}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + ICS_DAY_STEP);
  return date.toISOString().slice(0, ISO_DATE_LENGTH);
}

export function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

export function buildIcs(events: CalendarEvent[], calendarName: string): string {
  const lines = [
    ICS_BEGIN_CALENDAR,
    ICS_VERSION_LINE,
    ICS_PRODID,
    ICS_CALSCALE,
    ICS_METHOD,
    `X-WR-CALNAME:${escapeIcsText(calendarName)}`,
  ];
  for (const event of events) {
    const start = icsDate(event.date);
    const end = icsDate(nextIsoDate(event.date));
    lines.push(
      ICS_BEGIN_EVENT,
      `UID:${escapeIcsText(event.uid)}`,
      `DTSTAMP:${start}T000000Z`,
      `DTSTART;${ICS_DATE_VALUE}:${start}`,
      `DTEND;${ICS_DATE_VALUE}:${end}`,
      `SUMMARY:${escapeIcsText(event.title)}`,
    );
    if (event.description) {
      lines.push(`DESCRIPTION:${escapeIcsText(event.description)}`);
    }
    lines.push(ICS_END_EVENT);
  }
  lines.push(ICS_END_CALENDAR);
  return `${lines.join(ICS_CRLF)}${ICS_CRLF}`;
}

export function googleCalendarUrl(event: CalendarEvent): string {
  const params = new URLSearchParams({
    action: GOOGLE_CALENDAR_ACTION,
    text: event.title,
    dates: `${icsDate(event.date)}/${icsDate(nextIsoDate(event.date))}`,
  });
  if (event.description) params.set("details", event.description);
  return `${GOOGLE_CALENDAR_RENDER_URL}?${params.toString()}`;
}
