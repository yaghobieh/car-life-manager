import { describe, expect, it } from 'vitest';
import {
  AUTH_NEXT_QUERY,
  DOMAIN_APARTMENT,
  DOMAIN_CAR,
  HOST_LOCAL_APARTMENT,
  HOST_LOCAL_CAR,
  ROUTE_APARTMENT,
  ROUTE_AUTH,
  ROUTE_CAR,
  ROUTE_CARLIFE,
  ROUTE_PROPERTY,
} from '@const';
import { authHref, isCarAppPath, isSafeAppPath, productPathForHost } from './Route.utils';

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

describe('productPathForHost', () => {
  it('maps car and apartment hosts to product routes', () => {
    expect(productPathForHost(DOMAIN_CAR)).toBe(ROUTE_CAR);
    expect(productPathForHost(HOST_LOCAL_CAR)).toBe(ROUTE_CAR);
    expect(productPathForHost(DOMAIN_APARTMENT)).toBe(ROUTE_PROPERTY);
    expect(productPathForHost(HOST_LOCAL_APARTMENT)).toBe(ROUTE_PROPERTY);
    expect(productPathForHost('127.0.0.1')).toBeNull();
  });
});
