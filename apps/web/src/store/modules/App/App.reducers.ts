import type { AuthUser, DashboardPayload } from '@api';
import type { Vehicle } from '@clm/shared';
import { BOOLEAN_FALSE, BOOLEAN_TRUE } from '@const';

export function beginRefresh() {
  return { loading: BOOLEAN_TRUE, error: null };
}

export function refreshFailed(message: string) {
  return { error: message, loading: BOOLEAN_FALSE, authReady: BOOLEAN_TRUE };
}

export function refreshUnauthenticated(googleEnabled: boolean, emailNotifyReady: boolean, smsNotifyReady: boolean) {
  return {
    user: null,
    googleEnabled,
    emailNotifyReady,
    smsNotifyReady,
    vehicles: [],
    currentId: null,
    dashboard: null,
    loading: BOOLEAN_FALSE,
    error: null,
    authReady: BOOLEAN_TRUE,
  };
}

export function refreshSucceeded(
  user: AuthUser,
  googleEnabled: boolean,
  emailNotifyReady: boolean,
  smsNotifyReady: boolean,
  vehicles: Vehicle[],
  currentId: string | null,
  dashboard: DashboardPayload | null,
) {
  return {
    user,
    googleEnabled,
    emailNotifyReady,
    smsNotifyReady,
    vehicles,
    currentId,
    dashboard,
    loading: BOOLEAN_FALSE,
    error: null,
    authReady: BOOLEAN_TRUE,
  };
}
