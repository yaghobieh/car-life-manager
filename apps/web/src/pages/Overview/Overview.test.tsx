import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { BearProvider } from '@forgedevstack/bear';
import { LingoProvider } from '@forgedevstack/lingo/react';
import { describe, expect, it, vi } from 'vitest';
import { lingo } from '@locales';
import { Overview } from './Overview';

const mockVehicle = {
  id: 'v-1',
  userId: 'u-1',
  registrationNumber: '12345678',
  formattedRegistrationNumber: '12-345-78',
  make: 'Mazda',
  model: '3',
  modelYear: 2021,
  color: 'Blue',
  fuelType: 'Gasoline',
  ownershipSequence: 1,
  ownershipType: 'Private',
  registrationDate: '2021-01-01',
  registrationExpiry: '2025-01-01',
  nextTestDate: '2025-01-01',
  lastTestDate: '2024-01-01',
  dataProvenance: 'mot',
  dataSourceUpdatedAt: '2024-01-01T00:00:00Z',
  imageUrl: '/vehicles/mazda.png',
};

const mockDashboard = {
  vehicle: mockVehicle,
  tasks: [],
  expenses: [],
  documents: [],
  services: [],
  maintenance: [],
  reminders: [],
  recalls: [],
  timeline: [],
  expenseSummary: {
    total: 0,
    currentMonth: 0,
    byCategory: [],
    hasData: false,
  },
};

let mockAppState = {
  loading: false,
  vehicles: [] as typeof mockVehicle[],
  dashboard: null as typeof mockDashboard | null,
};

vi.mock('@hooks', () => ({
  useAppState: () => mockAppState,
  useBearId: () => 'Bear-test-id',
  resolveBearId: (_id: string | undefined, genId: string) => genId,
}));

describe('Overview', () => {
  it('shows an empty state when no vehicles exist', () => {
    mockAppState = {
      loading: false,
      vehicles: [],
      dashboard: null,
    };

    render(
      <BearProvider direction="rtl" defaultMode="light">
        <LingoProvider instance={lingo}>
          <MemoryRouter>
            <Overview />
          </MemoryRouter>
        </LingoProvider>
      </BearProvider>,
    );
    expect(screen.getByText('אין רכבים עדיין')).toBeTruthy();
  });

  it('renders correctly with a populated dashboard', () => {
    mockAppState = {
      loading: false,
      vehicles: [mockVehicle],
      dashboard: mockDashboard,
    };

    render(
      <BearProvider direction="rtl" defaultMode="light">
        <LingoProvider instance={lingo}>
          <MemoryRouter>
            <Overview />
          </MemoryRouter>
        </LingoProvider>
      </BearProvider>,
    );

    expect(screen.getByText(/Mazda 3/)).toBeTruthy();
  });
});
