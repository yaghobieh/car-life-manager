import { describe, expect, it } from 'vitest';
import { ROUTE_CAR, ROUTE_ONBOARDING, ROUTE_PLATFORM, ROUTE_PROPERTY } from '@const';
import { afterAuthPath, authErrorKey } from './Auth.utils';

const REJECTED_NEXT = '/evil';

describe('authErrorKey', () => {
  it('maps official Google callback codes', () => {
    expect(authErrorKey('google_unavailable')).toBe('authGoogleUnavailable');
    expect(authErrorKey('google_failed')).toBe('authGoogleFailed');
    expect(authErrorKey('auth0_unavailable')).toBe('authAuth0Unavailable');
    expect(authErrorKey('auth0_failed')).toBe('authAuth0Failed');
  });
});

describe('afterAuthPath', () => {
  it('opens the platform when next is missing', () => {
    expect(afterAuthPath(1)).toBe(ROUTE_PLATFORM);
    expect(afterAuthPath(0, REJECTED_NEXT)).toBe(ROUTE_PLATFORM);
  });

  it('sends empty car accounts to onboarding', () => {
    expect(afterAuthPath(0, ROUTE_CAR)).toBe(ROUTE_ONBOARDING);
    expect(afterAuthPath(1, ROUTE_CAR)).toBe(ROUTE_CAR);
  });

  it('keeps a safe property next path', () => {
    expect(afterAuthPath(0, ROUTE_PROPERTY)).toBe(ROUTE_PROPERTY);
  });
});
