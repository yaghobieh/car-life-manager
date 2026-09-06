import { describe, expect, it } from "vitest";
import { probeProviderHub } from "./providers.hub";
import { CONNECTION_NOT_SUPPORTED } from "./providers.const";

describe("probeProviderHub", () => {
  it("stays unsupported when no hub or provider API is configured", async () => {
    expect(await probeProviderHub("pango")).toBe(CONNECTION_NOT_SUPPORTED);
    expect(await probeProviderHub("cello")).toBe(CONNECTION_NOT_SUPPORTED);
  });
});
