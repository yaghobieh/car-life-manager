import { describe, expect, it } from 'vitest';
import type { Vehicle } from '@clm/shared';
import {
  STATUS_KIND_HEALTHY,
} from '@const';
import {
  buildOverviewMeta,
  buildOverviewPills,
  toneForKind,
  vehicleSubtitle,
  vehicleTitle,
} from './Overview.utils';
import {
  OVERVIEW_TONE_BAD,
  OVERVIEW_TONE_GOOD,
} from './Overview.const';

describe('Overview.utils', () => {
  const mockVehicle: Vehicle = {
    id: 'v1',
    userId: 'u1',
    registrationNumber: '12345678',
    formattedRegistrationNumber: '12-345-67',
    make: 'Kia',
    model: 'Picanto',
    modelYear: 2021,
    fuelType: 'gasoline',
    engine: '1200',
    color: 'silver',
    registrationDate: '2021-05-10',
    registrationExpiry: '2026-05-10',
    lastTestDate: '2024-05-10',
    nextTestDate: '2025-05-10',
    ownershipSequence: 2,
    ownershipType: 'private',
    mileage: 38000,
    dataSource: 'official',
    dataProvenance: 'official',
    dataSourceUpdatedAt: '2026-01-01',
    createdAt: '2021-05-10',
    updatedAt: '2026-01-01',
  };

  const t = (k: string) => `trans_${k}`;

  it('toneForKind returns good for healthy and bad otherwise', () => {
    expect(toneForKind(STATUS_KIND_HEALTHY)).toBe(OVERVIEW_TONE_GOOD);
    expect(toneForKind('action_required')).toBe(OVERVIEW_TONE_BAD);
  });

  it('buildOverviewPills constructs pills correctly with tones and translation keys', () => {
    const pills = buildOverviewPills(STATUS_KIND_HEALTHY, 'action_required', t);
    expect(pills).toHaveLength(3);
    expect(pills[0].label).toBe('trans_licenseValidShort');
    expect(pills[0].tone).toBe(OVERVIEW_TONE_GOOD);
    expect(pills[1].tone).toBe(OVERVIEW_TONE_BAD);
    expect(pills[2].label).toBe('trans_insuranceDisconnected');
    expect(pills[2].tone).toBe(OVERVIEW_TONE_BAD);
  });

  it('buildOverviewMeta constructs meta array with formatted values', () => {
    const meta = buildOverviewMeta(mockVehicle, 'he-IL', t);
    expect(meta).toHaveLength(3);
    expect(meta[0].label).toBe('trans_hand');
    expect(meta[0].value).toBe('2');
    expect(meta[1].label).toBe('trans_color');
    expect(meta[1].value).toBe('silver');
    expect(meta[2].label).toBe('trans_roadEntry');
    expect(meta[2].value).toBeTruthy();
  });

  it('vehicleTitle and vehicleSubtitle formats labels properly', () => {
    expect(vehicleTitle('Kia', 'Picanto', 'unknown')).toBe('Kia Picanto');
    expect(vehicleTitle(null, null, 'unknown')).toBe('unknown');
    expect(vehicleSubtitle('gasoline', 2021, 'unknown')).toContain('2021');
  });
});
