import { EXPENSE_COLUMN_DEFS } from './Expenses.const';

export function expenseColumns(t: (key: string) => string) {
  return EXPENSE_COLUMN_DEFS.map((column) => ({
    id: column.id,
    accessor: column.accessor,
    header: t(column.headerKey),
  }));
}
