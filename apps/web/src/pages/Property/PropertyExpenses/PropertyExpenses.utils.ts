import type { PropertyExpense } from '@clm/shared';
import { CURRENCY_ILS } from '@const';
import { PROPERTY_EXPENSE_COLUMN_DEFS } from './PropertyExpenses.const';

export function propertyExpenseColumns(t: (key: string) => string) {
  return PROPERTY_EXPENSE_COLUMN_DEFS.map((column) => ({
    id: column.id,
    accessor: column.accessor,
    header: t(column.headerKey),
  }));
}

export function propertyExpenseRows(
  expenses: PropertyExpense[],
  t: (key: string) => string,
  formatCurrency: (amount: number, currency: string) => string,
  locale: string,
) {
  return expenses.map((expense) => ({
    id: expense.id,
    date: new Date(expense.occurredAt).toLocaleDateString(locale),
    category: t(`propertyExpense_${expense.category}`),
    description: expense.description ?? t('unknown'),
    amount: formatCurrency(expense.amount, CURRENCY_ILS),
  }));
}
