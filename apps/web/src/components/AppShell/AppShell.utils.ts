import { NAV_OVERVIEW, ROUTE_HOME, VARIANT_NAV, VARIANT_NAV_ACTIVE } from '@const';
import type { NavItem } from './AppShell.types';

export function activeNavId(pathname: string, items: NavItem[]): string {
  const match = items.find((item) => item.to !== ROUTE_HOME && pathname.startsWith(item.to));
  return match?.id ?? NAV_OVERVIEW;
}

export function navButtonVariant(isActive: boolean): string {
  return isActive ? VARIANT_NAV_ACTIVE : VARIANT_NAV;
}
