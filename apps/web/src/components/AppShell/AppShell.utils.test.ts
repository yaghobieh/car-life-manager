import { describe, expect, it } from 'vitest';
import { NAV_OVERVIEW, NAV_PROPERTY_SEARCH, ROUTE_HOME, ROUTE_PROPERTY, ROUTE_PROPERTY_SEARCH, ROUTE_SERVICES } from '@const';
import { activeNavId, searchHits, userInitials } from './AppShell.utils';
import { NAV_ITEMS } from './AppShell.const';
import { PROPERTY_NAV_ITEMS } from '../PropertyShell/PropertyShell.const';
import type { ServiceProviderInfo, Task, Vehicle } from '@clm/shared';

const vehicle = {
  id: 'v1',
  formattedRegistrationNumber: '68-853-001',
  registrationNumber: '68853001',
  make: 'קיה',
  model: 'ספורטאז',
  color: 'לבן',
} as Vehicle;

const task = {
  id: 't1',
  title: 'העברת בעלות',
  description: 'ודא שהעברת הבעלות',
  category: 'ownership',
  source: 'task-engine',
} as Task;

const service = {
  providerId: 'ministry-of-transport',
  name: 'משרד התחבורה',
  note: 'data.gov.il',
} as ServiceProviderInfo;

function t(key: string): string {
  if (key === 'taskTitle_ownership') return 'Ownership transfer';
  if (key === 'provider_ministry_of_transport') return 'Ministry of Transport';
  return key;
}

describe('activeNavId', () => {
  it('keeps car and property homes from colliding', () => {
    expect(activeNavId(ROUTE_HOME, NAV_ITEMS, ROUTE_HOME)).toBe(NAV_OVERVIEW);
    expect(activeNavId(ROUTE_PROPERTY_SEARCH, PROPERTY_NAV_ITEMS, ROUTE_PROPERTY)).toBe(NAV_PROPERTY_SEARCH);
  });
});

describe('userInitials', () => {
  it('uses the first letters of a two-part name', () => {
    expect(userInitials('יוחנן יעקבייה', 'a@b.com')).toBe('י.י');
  });
});

describe('searchHits', () => {
  it('finds vehicles, translated tasks and official services', () => {
    const hits = searchHits('kia', [vehicle], [task], [service], t);
    expect(hits.some((hit) => hit.to === ROUTE_HOME && hit.vehicleId === 'v1')).toBe(true);

    const plateHits = searchHits('853', [vehicle], [task], [service], t);
    expect(plateHits[0]?.vehicleId).toBe('v1');

    const taskHits = searchHits('ownership', [vehicle], [task], [service], t);
    expect(taskHits.some((hit) => hit.title === 'Ownership transfer')).toBe(true);

    const serviceHits = searchHits('ministry', [vehicle], [task], [service], t);
    expect(serviceHits.some((hit) => hit.to === ROUTE_SERVICES)).toBe(true);
  });
});
