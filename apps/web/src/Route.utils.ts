import {
  AUTH_NEXT_QUERY,
  DOMAIN_APARTMENT,
  DOMAIN_CAR,
  HOST_PREFIX_APARTMENT,
  HOST_PREFIX_CAR,
  ROUTE_APARTMENT,
  ROUTE_AUTH,
  ROUTE_CAR,
  ROUTE_CARLIFE,
  ROUTE_PROPERTY,
} from '@const';

export function authHref(next: string): string {
  return `${ROUTE_AUTH}?${AUTH_NEXT_QUERY}=${encodeURIComponent(next)}`;
}

export function isCarAppPath(path: string): boolean {
  return path === ROUTE_CAR || path.startsWith(`${ROUTE_CAR}/`) || path === ROUTE_CARLIFE;
}

export function isPropertyAppPath(path: string): boolean {
  return path === ROUTE_PROPERTY || path.startsWith(`${ROUTE_PROPERTY}/`) || path === ROUTE_APARTMENT;
}

export function isSafeAppPath(path: string): boolean {
  if (!path.startsWith('/') || path.startsWith('//')) return false;
  return isCarAppPath(path) || isPropertyAppPath(path);
}

export function productPathForHost(hostname: string): string | null {
  if (hostname === DOMAIN_CAR || hostname.startsWith(HOST_PREFIX_CAR)) return ROUTE_CAR;
  if (hostname === DOMAIN_APARTMENT || hostname.startsWith(HOST_PREFIX_APARTMENT)) return ROUTE_PROPERTY;
  return null;
}

export function oauthStartHref(startPath: string, next?: string | null): string {
  if (!next || !isSafeAppPath(next)) return startPath;
  return `${startPath}?${AUTH_NEXT_QUERY}=${encodeURIComponent(next)}`;
}
