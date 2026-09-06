import { describe, expect, it } from "vitest";
import { authErrorUrl, isValidPhone, normalizePhone } from "./auth.utils";
import { AUTH_ERROR_QUERY, AUTH_PATH, GOOGLE_FAILED_CODE } from "./auth.const";

describe("authErrorUrl", () => {
  it("sends Google failures back to the auth page", () => {
    const url = new URL(authErrorUrl(GOOGLE_FAILED_CODE));
    expect(url.pathname).toBe(AUTH_PATH);
    expect(url.searchParams.get(AUTH_ERROR_QUERY)).toBe(GOOGLE_FAILED_CODE);
  });
});

describe("phone", () => {
  it("accepts Israeli mobile numbers and empty values", () => {
    expect(isValidPhone("")).toBe(true);
    expect(isValidPhone("0501234567")).toBe(true);
    expect(isValidPhone("+972 50-123-4567")).toBe(true);
    expect(isValidPhone("123")).toBe(false);
    expect(normalizePhone("  ")).toBe(null);
    expect(normalizePhone("0501234567")).toBe("0501234567");
  });
});
