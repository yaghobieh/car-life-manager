import { ROUTE_HOME, ROUTE_ONBOARDING, ZERO } from '@const';
import { AUTH_MODE_LOGIN, AUTH_MODE_REGISTER } from './Auth.const';
import type { AuthMode } from './Auth.types';

export function nextAuthMode(mode: AuthMode): AuthMode {
  return mode === AUTH_MODE_LOGIN ? AUTH_MODE_REGISTER : AUTH_MODE_LOGIN;
}

export function afterAuthPath(vehicleCount: number): string {
  return vehicleCount === ZERO ? ROUTE_ONBOARDING : ROUTE_HOME;
}

export function authErrorKey(code?: string): string {
  if (code === 'email_taken') return 'authEmailTaken';
  if (code === 'password_short') return 'authPasswordShort';
  if (code === 'invalid_email') return 'authInvalidEmail';
  if (code === 'google_unavailable') return 'authGoogleUnavailable';
  return 'authFailed';
}
