import type {
  Expense,
  ExpenseSummary,
  MaintenanceRecord,
  Reminder,
  ServiceProviderInfo,
  Task,
  TimelineEvent,
  Vehicle,
  VehicleDocument,
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
  documents: VehicleDocument[];
  recalls: VehicleRecall[];
  maintenance: MaintenanceRecord[];
  timeline: TimelineEvent[];
  identityVerification: { status: string; note: string };
}

export interface VehicleListPayload {
  vehicles: Vehicle[];
}

export interface AuthUser {
  id: string;
  email: string | null;
  username: string | null;
  name: string | null;
  phone: string | null;
  imageUrl: string | null;
  notifyEmail: boolean;
  notifySms: boolean;
  role: string;
}

export interface NotificationChannels {
  email: boolean;
  sms: boolean;
  smsAccount: boolean;
}

export interface AuthMePayload {
  user: AuthUser | null;
  googleEnabled: boolean;
  auth0Enabled: boolean;
  notificationChannels: NotificationChannels;
}

export interface SmsTestResult {
  channel: string;
  status: string;
  error?: string;
}

export interface DocumentCreateInput {
  type: VehicleDocument['type'];
  title: string;
  notes?: string | null;
  expiresAt?: string | null;
  fileName?: string;
  mimeType?: string;
  contentBase64?: string;
}

export interface ProfileUpdateInput {
  name: string;
  username?: string;
  phone: string;
  notifyEmail: boolean;
  notifySms: boolean;
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
