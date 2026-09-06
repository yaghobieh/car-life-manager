import type { ExpenseSummary, Reminder, VehicleRecall } from '@clm/shared';

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

export interface OverviewRecallsProps {
  recalls: VehicleRecall[];
}

export interface OverviewStatusProps {
  licenseKind: string;
  testKind: string;
  registrationExpiry: string | null;
  nextTestDate: string | null;
  lastTestDate: string | null;
}

export interface OverviewCompareProps {
  currentId: string;
}
