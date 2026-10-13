import type { AuthUser, DashboardPayload } from '@api';
import type { Vehicle } from '@clm/shared';
import { BOOLEAN_FALSE, BOOLEAN_TRUE } from '@const';

export function beginRefresh() {
  return { loading: BOOLEAN_TRUE, error: null };
}

export function refreshFailed(message: string) {
  return { error: message, loading: BOOLEAN_FALSE, authReady: BOOLEAN_TRUE };
}

export function refreshUnauthenticated(
  googleEnabled: boolean,
  auth0Enabled: boolean,
  emailNotifyReady: boolean,
  smsNotifyReady: boolean,
  smsAccountReady: boolean,
) {
  return {
    user: null,
    googleEnabled,
    auth0Enabled,
    emailNotifyReady,
    smsNotifyReady,
    smsAccountReady,
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
  auth0Enabled: boolean,
  emailNotifyReady: boolean,
  smsNotifyReady: boolean,
  smsAccountReady: boolean,
  vehicles: Vehicle[],
  currentId: string | null,
  dashboard: DashboardPayload | null,
) {
  return {
    user,
    googleEnabled,
    auth0Enabled,
    emailNotifyReady,
    smsNotifyReady,
    smsAccountReady,
    vehicles,
    currentId,
    dashboard,
    loading: BOOLEAN_FALSE,
    error: null,
    authReady: BOOLEAN_TRUE,
  };
}
