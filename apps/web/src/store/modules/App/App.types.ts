import type { Vehicle } from '@clm/shared';
import type { AuthUser, DashboardPayload } from '@api';

export interface AppNucleusState {
  user: AuthUser | null;
  googleEnabled: boolean;
  emailNotifyReady: boolean;
  smsNotifyReady: boolean;
  authReady: boolean;
  vehicles: Vehicle[];
  currentId: string | null;
  dashboard: DashboardPayload | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  select: (id: string) => void;
}
