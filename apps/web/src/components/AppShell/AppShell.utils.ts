import { NAV_OVERVIEW, ROUTE_HOME } from '@const';
import type { NavItem } from './AppShell.types';

export function activeNavId(pathname: string, items: NavItem[]): string {
  const match = items.find((item) => item.to !== ROUTE_HOME && pathname.startsWith(item.to));
  return match?.id ?? NAV_OVERVIEW;
}
