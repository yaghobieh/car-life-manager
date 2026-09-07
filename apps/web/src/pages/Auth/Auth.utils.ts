import {
  ROLE_CAR_SELLER,
  ROUTE_CAR,
  ROUTE_ONBOARDING,
  ROUTE_PLATFORM,
  ROUTE_PROPERTY,
  ZERO,
} from '@const';
import { isCarAppPath, isSafeAppPath } from '../../Route.utils';
import { AUTH_ERROR_KEYS, AUTH_MODE_LOGIN, AUTH_MODE_REGISTER, PROPERTY_AUTH_ROLES, ROLE_LABEL_KEYS } from './Auth.const';
import type { AuthMode } from './Auth.types';

export function nextAuthMode(mode: AuthMode): AuthMode {
  return mode === AUTH_MODE_LOGIN ? AUTH_MODE_REGISTER : AUTH_MODE_LOGIN;
}

export function afterAuthPath(vehicleCount: number, next?: string | null, role?: string | null): string {
  const safe = next && isSafeAppPath(next) ? next : null;
  if (safe) {
    if (isCarAppPath(safe) && vehicleCount === ZERO && safe !== ROUTE_ONBOARDING) {
      return ROUTE_ONBOARDING;
    }
    return safe;
  }
  if (role === ROLE_CAR_SELLER) {
    return vehicleCount === ZERO ? ROUTE_ONBOARDING : ROUTE_CAR;
  }
  if (role && PROPERTY_AUTH_ROLES.includes(role as (typeof PROPERTY_AUTH_ROLES)[number])) {
    return ROUTE_PROPERTY;
  }
  return ROUTE_PLATFORM;
}

export function authErrorKey(code?: string): string {
  if (!code) return 'authFailed';
  return AUTH_ERROR_KEYS[code] ?? 'authFailed';
}

export function roleLabelKey(role: string): string {
  return ROLE_LABEL_KEYS[role] ?? 'roleOwner';
}
