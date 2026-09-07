import { describe, expect, it } from 'vitest';
import { AUTH_NEXT_QUERY, ROUTE_APARTMENT, ROUTE_AUTH, ROUTE_CAR, ROUTE_CARLIFE, ROUTE_PROPERTY } from '@const';
import { authHref, isCarAppPath, isSafeAppPath } from './Route.utils';

describe('authHref', () => {
  it('keeps next on the shared auth route', () => {
    expect(authHref(ROUTE_PROPERTY)).toBe(`${ROUTE_AUTH}?${AUTH_NEXT_QUERY}=${encodeURIComponent(ROUTE_PROPERTY)}`);
  });
});

describe('isSafeAppPath', () => {
  it('accepts only car and property app paths', () => {
    expect(isCarAppPath(ROUTE_CAR)).toBe(true);
    expect(isSafeAppPath(ROUTE_PROPERTY)).toBe(true);
    expect(isSafeAppPath(`${ROUTE_CAR}/tasks`)).toBe(true);
    expect(isSafeAppPath(ROUTE_CARLIFE)).toBe(true);
    expect(isSafeAppPath(ROUTE_APARTMENT)).toBe(true);
    expect(isSafeAppPath('https://evil.example')).toBe(false);
    expect(isSafeAppPath('//evil.example')).toBe(false);
    expect(isSafeAppPath('/welcome')).toBe(false);
  });
});
