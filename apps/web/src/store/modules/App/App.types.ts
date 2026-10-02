import type { Vehicle } from '@clm/shared';
import type { AuthUser, DashboardPayload, NotifyTestResult } from '@api';

export interface AppNucleusState {
  user: AuthUser | null;
  googleEnabled: boolean;
  auth0Enabled: boolean;
  emailNotifyReady: boolean;
  smsNotifyReady: boolean;
  smsAccountReady: boolean;
  authReady: boolean;
  vehicles: Vehicle[];
  currentId: string | null;
  dashboard: DashboardPayload | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  select: (id: string) => void;
  login: (identifier: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: string, username: string) => Promise<void>;
  sendTestSms: () => Promise<NotifyTestResult>;
  sendTestEmail: () => Promise<NotifyTestResult>;
}
