import { describe, expect, it } from "vitest";
import { CHANNEL_EMAIL } from "./notifications.const";
import { reminderBody, reminderSourceKey } from "./notifications.utils";

describe("notifications.utils", () => {
  it("builds a stable reminder source key", () => {
    expect(reminderSourceKey("abc", CHANNEL_EMAIL)).toBe("reminder:abc:email");
  });

  it("builds a readable reminder body", () => {
    expect(reminderBody("Annual test", "2026-09-24")).toBe("Annual test · 2026-09-24");
  });
});
