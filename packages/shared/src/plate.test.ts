import { describe, expect, it } from "vitest";
import { formatRegistrationNumber, isValidRegistrationNumber, normalizeRegistrationNumber } from "./plate";

describe("registration numbers", () => {
  it("normalizes dashes and spaces", () => {
    expect(normalizeRegistrationNumber("67-123-45")).toBe("6712345");
    expect(normalizeRegistrationNumber("67 123 45")).toBe("6712345");
    expect(normalizeRegistrationNumber("6712345")).toBe("6712345");
  });

  it("validates 7-8 digit plates", () => {
    expect(isValidRegistrationNumber("67-123-45")).toBe(true);
    expect(isValidRegistrationNumber("123-45-678")).toBe(true);
    expect(isValidRegistrationNumber("12345")).toBe(false);
  });

  it("formats 7 digit plates", () => {
    expect(formatRegistrationNumber("6712345")).toBe("67-123-45");
  });
});
