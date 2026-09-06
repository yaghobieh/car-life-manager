import type {
  Expense,
  ExpenseSummary,
  Reminder,
  ServiceProviderInfo,
  Task,
  Vehicle,
  VehicleRecall,
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
  recalls: VehicleRecall[];
  identityVerification: { status: string; note: string };
}

export interface VehicleListPayload {
  vehicles: Vehicle[];
}

export interface AuthUser {
  id: string;
  email: string | null;
  name: string | null;
  imageUrl: string | null;
}

export interface AuthMePayload {
  user: AuthUser | null;
  googleEnabled: boolean;
}

export interface AuthUserPayload {
  user: AuthUser;
}

export interface ApiErrorBody {
  error?: string;
  code?: string;
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
  code?: string;
  presentation: ErrorPresentation;
}
