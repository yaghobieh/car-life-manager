import { describe, expect, it } from 'vitest';
import { ROLE_CAR_SELLER, ROLE_OWNER, ROLE_SELLER, ROUTE_CAR, ROUTE_ONBOARDING, ROUTE_PLATFORM, ROUTE_PROPERTY } from '@const';
import { afterAuthPath, authErrorKey, roleLabelKey } from './Auth.utils';

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

  it('sends property roles to NadLife and car sellers to onboarding', () => {
    expect(afterAuthPath(0, null, ROLE_OWNER)).toBe(ROUTE_PROPERTY);
    expect(afterAuthPath(0, null, ROLE_SELLER)).toBe(ROUTE_PROPERTY);
    expect(afterAuthPath(0, null, ROLE_CAR_SELLER)).toBe(ROUTE_ONBOARDING);
    expect(afterAuthPath(1, null, ROLE_CAR_SELLER)).toBe(ROUTE_CAR);
  });
});

describe('roleLabelKey', () => {
  it('maps register roles', () => {
    expect(roleLabelKey(ROLE_OWNER)).toBe('roleOwner');
    expect(roleLabelKey(ROLE_CAR_SELLER)).toBe('roleCarSeller');
  });
});
