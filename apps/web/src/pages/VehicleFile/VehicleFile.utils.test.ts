import { describe, expect, it } from 'vitest';
import {
  VEHICLE_TAB_DETAILS,
  VEHICLE_TAB_DOCUMENTS,
  VEHICLE_TAB_EXPENSES,
  VEHICLE_TAB_MAINTENANCE,
  VEHICLE_TAB_OVERVIEW,
  VEHICLE_TAB_OWNERSHIP,
  VEHICLE_TAB_SERVICES,
  VEHICLE_TAB_TIMELINE,
} from '@const';
import type { DashboardPayload } from '@api';
import { vehicleFileRows } from './VehicleFile.utils';

describe('vehicleFileRows', () => {
  const mockDashboard: DashboardPayload = {
    vehicle: {
      id: 'v1',
      userId: 'u1',
      registrationNumber: '12345678',
      formattedRegistrationNumber: '12-345-67',
      make: 'Kia',
      model: 'Sportage',
      modelYear: 2022,
      fuelType: 'gasoline',
      engine: '1600',
      color: 'white',
      registrationDate: '2022-01-15',
      registrationExpiry: '2027-01-15',
      lastTestDate: '2025-01-15',
      nextTestDate: '2026-01-15',
      ownershipSequence: 1,
      ownershipType: 'private',
      mileage: 45000,
      dataSource: 'official',
      dataProvenance: 'official',
      dataSourceUpdatedAt: '2026-01-01',
      createdAt: '2022-01-15',
      updatedAt: '2026-01-01',
    },
    tasks: [],
    expenses: [
      {
        id: 'e1',
        vehicleId: 'v1',
        occurredAt: '2026-02-01',
        amount: 250,
        currency: 'ILS',
        merchant: null,
        description: null,
        recurring: false,
        attachmentId: null,
        category: 'fuel',
        createdAt: '2026-02-01',
      },
    ],
    expenseSummary: {
      previousMonth: 0,
      yearlyTotal: 250,
      averageMonthly: 250,
      currentMonth: 250,
      byCategory: [{ category: 'fuel', amount: 250 }],
      hasData: true,
    },
    maintenance: [
      {
        id: 'm1',
        vehicleId: 'v1',
        serviceDate: '2025-06-01',
        serviceType: 'annual',
        mileage: 30000,
        garage: null,
        parts: null,
        cost: 600,
        notes: null,
        createdAt: '2025-06-01',
      },
    ],
    documents: [
      {
        id: 'd1',
        vehicleId: 'v1',
        type: 'insurance',
        title: 'Insurance Policy',
        storageKey: 'key1',
        expiresAt: null,
        originalName: null,
        mimeType: null,
        fileSize: null,
        hasFile: false,
        notes: null,
        createdAt: '2026-01-01',
      },
    ],
    services: [
      {
        providerId: 's1',
        name: 'Official Garage',
        category: 'parking',
        officialUrl: null,
        status: 'connected',
        lastCheckedAt: '2026-01-01',
        note: '',
        source: 'provider',
        confirmedByUserAt: null,
      },
    ],
    recalls: [],
    timeline: [
      {
        id: 'ev1',
        type: 'vehicle_added',
        occurredAt: '2026-01-01',
        source: 'official',
        detail: 'Vehicle registered in CLM',
      },
    ],
    reminders: [],
    identityVerification: { status: 'unverified', note: '' },
  };

  const input = {
    dashboard: mockDashboard,
    unknownLabel: 'לא ידוע',
    intro: 'סקירת רכב',
    yearLabel: 'שנה',
    colorLabel: 'צבע',
    handLabel: 'יד',
    ownershipLabel: 'בעלות',
    roadEntryLabel: 'עלייה לכביש',
    licenseLabel: 'תוקף רישיון',
    testLabel: 'מבחן רישוי',
    timelineTitle: (type: string) => `אירוע: ${type}`,
  };

  it('builds overview row', () => {
    const rows = vehicleFileRows(VEHICLE_TAB_OVERVIEW, input);
    expect(rows).toHaveLength(1);
    expect(rows[0].title).toBe('סקירת רכב');
  });

  it('builds details rows', () => {
    const rows = vehicleFileRows(VEHICLE_TAB_DETAILS, input);
    expect(rows).toHaveLength(5);
    expect(rows[0].title).toContain('2022');
  });

  it('builds ownership rows', () => {
    const rows = vehicleFileRows(VEHICLE_TAB_OWNERSHIP, input);
    expect(rows).toHaveLength(3);
    expect(rows[0].title).toContain('יד: 1');
    expect(rows[1].title).toContain('בעלות: private');
    expect(rows[2].title).toContain('עלייה לכביש: 2022-01-15');
  });

  it('builds documents rows', () => {
    const rows = vehicleFileRows(VEHICLE_TAB_DOCUMENTS, input);
    expect(rows).toHaveLength(1);
    expect(rows[0].title).toBe('Insurance Policy');
  });

  it('builds services rows', () => {
    const rows = vehicleFileRows(VEHICLE_TAB_SERVICES, input);
    expect(rows).toHaveLength(1);
    expect(rows[0].title).toBe('Official Garage');
  });

  it('builds expenses rows', () => {
    const rows = vehicleFileRows(VEHICLE_TAB_EXPENSES, input);
    expect(rows).toHaveLength(1);
    expect(rows[0].title).toBe('fuel 250');
  });

  it('builds maintenance rows', () => {
    const rows = vehicleFileRows(VEHICLE_TAB_MAINTENANCE, input);
    expect(rows).toHaveLength(1);
    expect(rows[0].title).toBe('annual 2025-06-01');
  });

  it('builds timeline rows aggregating isolated vehicle events', () => {
    const rows = vehicleFileRows(VEHICLE_TAB_TIMELINE, input);
    expect(rows).toHaveLength(1);
    expect(rows[0].title).toBe('אירוע: vehicle_added');
    expect(rows[0].body).toBe('Vehicle registered in CLM');
  });
});
