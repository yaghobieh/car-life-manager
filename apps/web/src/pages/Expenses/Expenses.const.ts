import {
  EXPENSE_CATEGORY_FUEL,
  EXPENSE_CATEGORY_INSURANCE,
  EXPENSE_CATEGORY_MAINTENANCE,
  EXPENSE_CATEGORY_OTHER,
  EXPENSE_CATEGORY_PARKING,
  EXPENSE_CATEGORY_REGISTRATION,
  EXPENSE_CATEGORY_TEST,
  EXPENSE_CATEGORY_TOLLS,
} from '@const';

export const EXPENSE_COLUMN_DEFS = [
  { id: 'occurredAt', accessor: 'occurredAt', headerKey: 'date' },
  { id: 'category', accessor: 'category', headerKey: 'category' },
  { id: 'description', accessor: 'description', headerKey: 'description' },
  { id: 'amount', accessor: 'amount', headerKey: 'amount' },
] as const;

export const EXPENSE_CATEGORY_OPTIONS = [
  EXPENSE_CATEGORY_FUEL,
  EXPENSE_CATEGORY_PARKING,
  EXPENSE_CATEGORY_TOLLS,
  EXPENSE_CATEGORY_INSURANCE,
  EXPENSE_CATEGORY_MAINTENANCE,
  EXPENSE_CATEGORY_REGISTRATION,
  EXPENSE_CATEGORY_TEST,
  EXPENSE_CATEGORY_OTHER,
] as const;
