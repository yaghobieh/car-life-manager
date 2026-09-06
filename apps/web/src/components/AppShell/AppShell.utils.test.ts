import { describe, expect, it } from 'vitest';
import { ROUTE_HOME, ROUTE_SERVICES } from '@const';
import { searchHits } from './AppShell.utils';
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
