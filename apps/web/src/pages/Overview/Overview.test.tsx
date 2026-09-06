import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { BearProvider } from '@forgedevstack/bear';
import { LingoProvider } from '@forgedevstack/lingo/react';
import { describe, expect, it, vi } from 'vitest';
import { lingo } from '@locales';
import { Overview } from './Overview';

vi.mock('@hooks', () => ({
  useAppState: () => ({
    loading: false,
    vehicles: [],
    dashboard: null,
  }),
}));

describe('Overview', () => {
  it('shows an empty state instead of fake expenses', () => {
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
});
