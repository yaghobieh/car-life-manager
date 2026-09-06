import { describe, expect, it } from 'vitest';
import { authErrorKey } from './Auth.utils';

describe('authErrorKey', () => {
  it('maps official Google callback codes', () => {
    expect(authErrorKey('google_unavailable')).toBe('authGoogleUnavailable');
    expect(authErrorKey('google_failed')).toBe('authGoogleFailed');
  });
});
