import type { DashboardPayload } from '@api';
import type { Vehicle } from '@clm/shared';

export function beginRefresh() {
  return { loading: true, error: null };
}

export function refreshFailed(message: string) {
  return { error: message, loading: false };
}

export function refreshSucceeded(vehicles: Vehicle[], currentId: string | null, dashboard: DashboardPayload | null) {
  return { vehicles, currentId, dashboard, loading: false };
}
