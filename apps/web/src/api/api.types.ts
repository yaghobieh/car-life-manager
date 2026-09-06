import type {
  Expense,
  ExpenseSummary,
  Reminder,
  ServiceProviderInfo,
  Task,
  Vehicle,
} from '@clm/shared';
import {
  ERROR_PRESENTATION_MODAL,
  ERROR_PRESENTATION_PAGE,
  ERROR_PRESENTATION_TOAST,
} from '@const';

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

export type ErrorPresentation =
  | typeof ERROR_PRESENTATION_TOAST
  | typeof ERROR_PRESENTATION_PAGE
  | typeof ERROR_PRESENTATION_MODAL;

export interface ApiErrorHandler {
  (error: ApiClientError): void;
}

export interface ApiClientError {
  message: string;
  status: number;
  presentation: ErrorPresentation;
}
