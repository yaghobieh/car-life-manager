import type {
  Expense,
  ExpenseSummary,
  Reminder,
  ServiceProviderInfo,
  Task,
  Vehicle,
} from '@clm/shared';

export interface DashboardPayload {
  vehicle: Vehicle;
  tasks: Task[];
  services: ServiceProviderInfo[];
  expenses: Expense[];
  expenseSummary: ExpenseSummary;
  reminders: Reminder[];
  identityVerification: { status: string; note: string };
}

export interface VehicleListPayload {
  vehicles: Vehicle[];
}

export interface ApiErrorBody {
  error?: string;
}
