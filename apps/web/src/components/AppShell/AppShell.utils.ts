import type { Vehicle } from '@clm/shared';
import { NAV_OVERVIEW, ROUTE_HOME, SPACE, TITLE_SEPARATOR, VARIANT_NAV, VARIANT_NAV_ACTIVE } from '@const';
import type { NavItem } from './AppShell.types';
import { MOBILE_PRIMARY_NAV_IDS } from './AppShell.const';

export function vehicleOptionLabel(vehicle: Vehicle): string {
  const officialName = [vehicle.make, vehicle.model].filter(Boolean).join(SPACE);
  if (!officialName) return vehicle.formattedRegistrationNumber;
  return `${vehicle.formattedRegistrationNumber}${TITLE_SEPARATOR}${officialName}`;
}

export function activeNavId(pathname: string, items: NavItem[]): string {
  const match = items.find((item) => item.to !== ROUTE_HOME && pathname.startsWith(item.to));
  return match?.id ?? NAV_OVERVIEW;
}

export function navButtonVariant(isActive: boolean): string {
  return isActive ? VARIANT_NAV_ACTIVE : VARIANT_NAV;
}

export function isMobilePrimaryNav(id: string): boolean {
  return MOBILE_PRIMARY_NAV_IDS.some((navId) => navId === id);
}

export function mobilePrimaryItems(items: NavItem[]): NavItem[] {
  return items.filter((item) => isMobilePrimaryNav(item.id));
}

export function isMoreNavActive(activeId: string): boolean {
  return !isMobilePrimaryNav(activeId);
}
