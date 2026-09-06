import type { ExpenseSummary, Reminder } from '@clm/shared';

export interface TaskFilterCounts {
  all: number;
  overdue: number;
  important: number;
}

export type OverviewView = 'loading' | 'empty' | 'ready';

export interface OverviewExpensesProps {
  expenseSummary: ExpenseSummary;
}

export interface OverviewRemindersProps {
  reminders: Reminder[];
}
