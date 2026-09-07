import type { ServiceProviderInfo, Task, Vehicle } from '@clm/shared';
import {
  EMPTY_STRING,
  NAV_GROUP_GENERAL,
  NAV_GROUP_MANAGE,
  NAV_OVERVIEW,
  ROUTE_HOME,
  ROUTE_SERVICES,
  ROUTE_TASKS,
  SEARCH_KIND_SERVICE,
  SEARCH_KIND_TASK,
  SEARCH_KIND_VEHICLE,
  SEARCH_MAX_RESULTS,
  SEARCH_MIN_LENGTH,
  SPACE,
  TITLE_SEPARATOR,
  VARIANT_NAV,
  VARIANT_NAV_ACTIVE,
  ZERO,
} from '@const';
import { providerDisplayName, taskDisplayTitle } from '@locales';
import type { NavItem, SearchHit } from './AppShell.types';
import { MOBILE_PRIMARY_NAV_IDS, SEARCH_MAKE_ALIASES } from './AppShell.const';

export function userInitials(name?: string | null, email?: string | null): string {
  const source = name?.trim() || email?.trim() || EMPTY_STRING;
  if (!source) return EMPTY_STRING;
  const parts = source.split(SPACE).filter(Boolean);
  if (parts.length > 1) return `${parts[0][0]}.${parts[1][0]}`;
  return source.slice(ZERO, 2);
}

export function sidebarGroups(items: NavItem[], t: (key: string) => string) {
  return [
    {
      id: NAV_GROUP_GENERAL,
      label: t('navGeneral'),
      items: items.filter((item) => item.group === NAV_GROUP_GENERAL),
    },
    {
      id: NAV_GROUP_MANAGE,
      label: t('navManage'),
      items: items.filter((item) => item.group === NAV_GROUP_MANAGE),
    },
  ].filter((group) => group.items.length > ZERO);
}

export function vehicleOptionLabel(vehicle: Vehicle): string {
  const officialName = [vehicle.make, vehicle.model].filter(Boolean).join(SPACE);
  if (!officialName) return vehicle.formattedRegistrationNumber;
  return `${vehicle.formattedRegistrationNumber}${TITLE_SEPARATOR}${officialName}`;
}

export function vehicleShortName(vehicle: Vehicle): string {
  return [vehicle.make, vehicle.model].filter(Boolean).join(SPACE) || vehicle.formattedRegistrationNumber;
}

export function activeNavId(pathname: string, items: NavItem[], homeTo = ROUTE_HOME): string {
  const match = items.find((item) => item.to !== homeTo && pathname.startsWith(item.to));
  return match?.id ?? items[ZERO]?.id ?? NAV_OVERVIEW;
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

function includesQuery(value: string | null | undefined, query: string): boolean {
  return Boolean(value && value.toLowerCase().includes(query));
}

function matchesMakeAlias(make: string | null | undefined, query: string): boolean {
  if (!make) return false;
  return Object.entries(SEARCH_MAKE_ALIASES).some(([hebrew, english]) => {
    return make.includes(hebrew) && english.includes(query);
  });
}

export function searchHits(
  query: string,
  vehicles: Vehicle[],
  tasks: Task[],
  services: ServiceProviderInfo[],
  t: (key: string) => string,
): SearchHit[] {
  const trimmed = query.trim().toLowerCase();
  if (trimmed.length < SEARCH_MIN_LENGTH) return [];

  const vehicleHits = vehicles
    .filter((vehicle) => {
      return (
        includesQuery(vehicle.formattedRegistrationNumber, trimmed)
        || includesQuery(vehicle.registrationNumber, trimmed)
        || includesQuery(vehicle.make, trimmed)
        || matchesMakeAlias(vehicle.make, trimmed)
        || includesQuery(vehicle.model, trimmed)
        || includesQuery(vehicle.color, trimmed)
      );
    })
    .map((vehicle) => ({
      id: vehicle.id,
      kind: SEARCH_KIND_VEHICLE,
      title: vehicleOptionLabel(vehicle),
      subtitle: t('vehicles'),
      to: ROUTE_HOME,
      vehicleId: vehicle.id,
    }));

  const taskHits = tasks
    .filter((task) => {
      const title = taskDisplayTitle(task, t);
      return includesQuery(title, trimmed) || includesQuery(task.description, trimmed) || includesQuery(task.category, trimmed);
    })
    .map((task) => ({
      id: task.id,
      kind: SEARCH_KIND_TASK,
      title: taskDisplayTitle(task, t),
      subtitle: t('tasks'),
      to: ROUTE_TASKS,
    }));

  const serviceHits = services
    .filter((service) => {
      const name = providerDisplayName(service.providerId, service.name, t);
      return includesQuery(name, trimmed) || includesQuery(service.note, trimmed) || includesQuery(service.providerId, trimmed);
    })
    .map((service) => ({
      id: service.providerId,
      kind: SEARCH_KIND_SERVICE,
      title: providerDisplayName(service.providerId, service.name, t),
      subtitle: t('services'),
      to: ROUTE_SERVICES,
    }));

  return [...vehicleHits, ...taskHits, ...serviceHits].slice(ZERO, SEARCH_MAX_RESULTS);
}
