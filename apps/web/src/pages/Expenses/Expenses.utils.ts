import type { Expense } from '@clm/shared';
import { CURRENCY_ILS } from '@const';
import { EXPENSE_COLUMN_DEFS } from './Expenses.const';

export function expenseColumns(t: (key: string) => string) {
  return EXPENSE_COLUMN_DEFS.map((column) => ({
    id: column.id,
    accessor: column.accessor,
    header: t(column.headerKey),
  }));
}

export function expenseRows(
  expenses: Expense[],
  t: (key: string) => string,
  formatCurrency: (amount: number, currency: string) => string,
  locale: string,
) {
  return expenses.map((expense) => ({
    id: expense.id,
    occurredAt: new Date(expense.occurredAt).toLocaleDateString(locale),
    category: t(`expense_${expense.category}`),
    description: expense.description ?? expense.merchant ?? t('unknown'),
    amount: formatCurrency(expense.amount, CURRENCY_ILS),
  }));
}
