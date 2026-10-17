import { describe, expect, it } from "vitest";
import { buildIcs, googleCalendarUrl, icsDate, nextIsoDate } from "./calendar";

describe("calendar", () => {
  it("formats all-day ICS dates and the next day", () => {
    expect(icsDate("2026-09-24")).toBe("20260924");
    expect(nextIsoDate("2026-09-24")).toBe("2026-09-25");
  });

  it("builds an ICS file with the reminder title", () => {
    const ics = buildIcs(
      [{ uid: "reminder-1", title: "Annual test", date: "2026-09-24", description: "Official date" }],
      "Car Life Manager",
    );
    expect(ics).toContain("BEGIN:VCALENDAR");
    expect(ics).toContain("SUMMARY:Annual test");
    expect(ics).toContain("DTSTART;VALUE=DATE:20260924");
    expect(ics).toContain("DTEND;VALUE=DATE:20260925");
  });

  it("builds a Google Calendar template URL", () => {
    const url = googleCalendarUrl({ uid: "reminder-1", title: "Insurance", date: "2026-10-01" });
    expect(url).toContain("calendar.google.com/calendar/render");
    expect(url).toContain("action=TEMPLATE");
    expect(url).toContain("dates=20261001%2F20261002");
  });
});
