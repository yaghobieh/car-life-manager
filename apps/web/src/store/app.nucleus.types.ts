import type { Vehicle } from '@clm/shared';
import type { DashboardPayload } from '@api';

export interface AppNucleusState {
  vehicles: Vehicle[];
  currentId: string | null;
  dashboard: DashboardPayload | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  select: (id: string) => void;
}
