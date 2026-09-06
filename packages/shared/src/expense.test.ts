import { describe, expect, it } from "vitest";
import { summarizeExpenses } from "./expense";
import type { Expense } from "./types";

describe("summarizeExpenses", () => {
  it("returns an empty summary without fabricating totals", () => {
    expect(summarizeExpenses([]).hasData).toBe(false);
    expect(summarizeExpenses([]).currentMonth).toBe(0);
  });

  it("sums the current month only", () => {
    const now = new Date("2026-08-10T00:00:00.000Z");
    const expenses: Expense[] = [
      {
        id: "1",
        vehicleId: "v1",
        category: "fuel",
        amount: 650,
        currency: "ILS",
        merchant: null,
        occurredAt: "2026-08-02T00:00:00.000Z",
        description: null,
        recurring: false,
        attachmentId: null,
        createdAt: "2026-08-02T00:00:00.000Z",
      },
      {
        id: "2",
        vehicleId: "v1",
        category: "insurance",
        amount: 420,
        currency: "ILS",
        merchant: null,
        occurredAt: "2026-07-02T00:00:00.000Z",
        description: null,
        recurring: false,
        attachmentId: null,
        createdAt: "2026-07-02T00:00:00.000Z",
      },
    ];
    const summary = summarizeExpenses(expenses, now);
    expect(summary.hasData).toBe(true);
    expect(summary.currentMonth).toBe(650);
    expect(summary.previousMonth).toBe(420);
  });
});
