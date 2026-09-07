import { ROUTE_ONBOARDING, ROUTE_PLATFORM, ZERO } from '@const';
import { isCarAppPath, isSafeAppPath } from '../../Route.utils';
import { AUTH_ERROR_KEYS, AUTH_MODE_LOGIN, AUTH_MODE_REGISTER } from './Auth.const';
import type { AuthMode } from './Auth.types';

export function nextAuthMode(mode: AuthMode): AuthMode {
  return mode === AUTH_MODE_LOGIN ? AUTH_MODE_REGISTER : AUTH_MODE_LOGIN;
}

export function afterAuthPath(vehicleCount: number, next?: string | null): string {
  const safe = next && isSafeAppPath(next) ? next : ROUTE_PLATFORM;
  if (isCarAppPath(safe) && vehicleCount === ZERO && safe !== ROUTE_ONBOARDING) {
    return ROUTE_ONBOARDING;
  }
  return safe;
}

export function authErrorKey(code?: string): string {
  if (!code) return 'authFailed';
  return AUTH_ERROR_KEYS[code] ?? 'authFailed';
}
