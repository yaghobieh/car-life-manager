import { describe, expect, it } from "vitest";
import { CHANNEL_EMAIL, CHANNEL_SMS } from "./notifications.const";
import { reminderBody, reminderScheduledBody, reminderScheduledSourceKey, reminderSourceKey, smsTestSourceKey } from "./notifications.utils";

describe("notifications.utils", () => {
  it("builds a stable reminder source key", () => {
    expect(reminderSourceKey("abc", CHANNEL_EMAIL)).toBe("reminder:abc:email");
  });

  it("keeps scheduled SMS distinct from due SMS", () => {
    expect(reminderScheduledSourceKey("abc", CHANNEL_SMS)).toBe("reminder:abc:scheduled:sms");
    expect(smsTestSourceKey("2026-09-12T08:00:00.000Z")).toBe("sms:test:2026-09-12T08:00:00.000Z");
  });

  it("builds a readable reminder body", () => {
    expect(reminderBody("Annual test", "2026-09-24")).toBe("Annual test · 2026-09-24");
    expect(reminderScheduledBody("Annual test", "2026-09-24")).toBe("Reminder set: Annual test · 2026-09-24");
  });
});
