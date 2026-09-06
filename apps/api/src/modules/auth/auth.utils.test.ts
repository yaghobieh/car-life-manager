import { describe, expect, it } from "vitest";
import { authErrorUrl } from "./auth.utils";
import { AUTH_ERROR_QUERY, AUTH_PATH, GOOGLE_FAILED_CODE } from "./auth.const";

describe("authErrorUrl", () => {
  it("sends Google failures back to the auth page", () => {
    const url = new URL(authErrorUrl(GOOGLE_FAILED_CODE));
    expect(url.pathname).toBe(AUTH_PATH);
    expect(url.searchParams.get(AUTH_ERROR_QUERY)).toBe(GOOGLE_FAILED_CODE);
  });
});
