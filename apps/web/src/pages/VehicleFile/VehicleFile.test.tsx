import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { BearProvider } from '@forgedevstack/bear';
import { LingoProvider } from '@forgedevstack/lingo/react';
import { describe, expect, it, vi } from 'vitest';
import { lingo } from '@locales';
import { VehicleFile } from './VehicleFile';

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

vi.mock('@hooks', () => ({
  useAppState: () => ({
    loading: false,
    vehicles: [mockVehicle],
    dashboard: mockDashboard,
  }),
  useBearId: () => 'Bear-test-id',
  resolveBearId: (_id: string | undefined, genId: string) => genId,
}));

describe('VehicleFile component', () => {
  it('renders without crashing with populated dashboard', () => {
    render(
      <BearProvider direction="rtl" defaultMode="light">
        <LingoProvider instance={lingo}>
          <MemoryRouter>
            <VehicleFile />
          </MemoryRouter>
        </LingoProvider>
      </BearProvider>,
    );

    expect(screen.getByText(/Mazda 3/)).toBeTruthy();
  });
});
