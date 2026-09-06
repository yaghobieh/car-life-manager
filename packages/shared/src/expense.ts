import type { Expense, ExpenseCategory, ExpenseSummary } from "./types";

export function summarizeExpenses(expenses: Expense[], now = new Date()): ExpenseSummary {
  if (expenses.length === 0) {
    return {
      currentMonth: 0,
      previousMonth: 0,
      yearlyTotal: 0,
      averageMonthly: 0,
      byCategory: [],
      hasData: false,
    };
  }

  const year = now.getFullYear();
  const month = now.getMonth();
  const previous = new Date(year, month - 1, 1);

  let currentMonth = 0;
  let previousMonth = 0;
  let yearlyTotal = 0;
  const byCategory = new Map<ExpenseCategory, number>();
  const months = new Set<string>();

  for (const expense of expenses) {
    const occurred = new Date(expense.occurredAt);
    if (Number.isNaN(occurred.getTime())) continue;
    months.add(`${occurred.getFullYear()}-${occurred.getMonth()}`);
    if (occurred.getFullYear() === year) yearlyTotal += expense.amount;
    if (occurred.getFullYear() === year && occurred.getMonth() === month) {
      currentMonth += expense.amount;
    }
    if (occurred.getFullYear() === previous.getFullYear() && occurred.getMonth() === previous.getMonth()) {
      previousMonth += expense.amount;
    }
    byCategory.set(expense.category, (byCategory.get(expense.category) ?? 0) + expense.amount);
  }

  return {
    currentMonth,
    previousMonth,
    yearlyTotal,
    averageMonthly: months.size === 0 ? 0 : yearlyTotal / Math.max(months.size, 1),
    byCategory: [...byCategory.entries()].map(([category, amount]) => ({ category, amount })),
    hasData: true,
  };
}
