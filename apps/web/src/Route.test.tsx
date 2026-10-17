import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { BearProvider } from '@forgedevstack/bear';
import { LingoProvider } from '@forgedevstack/lingo/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ROUTE_APARTMENT, ROUTE_AUTH, ROUTE_CAR, ROUTE_CARLIFE, ROUTE_PLATFORM, ROUTE_PROPERTY, ROUTE_WELCOME } from '@const';
import { lingo } from '@locales';
import { AppRoutes } from './Route';

vi.mock('@hooks', () => ({
  useAppState: () => ({
    user: null,
    vehicles: [],
    loading: false,
    authReady: true,
    googleEnabled: false,
    error: null,
    dashboard: null,
    refresh: vi.fn(),
    auth0Enabled: false,
  }),
  useBearId: () => 'Bear-SvgAsset-a000000000000',
  resolveBearId: (_id: string | undefined, generatedId: string) => generatedId,
}));

function renderPath(path: string) {
  return render(
    <BearProvider direction="rtl" defaultMode="light">
      <LingoProvider instance={lingo}>
        <MemoryRouter initialEntries={[path]}>
          <AppRoutes />
        </MemoryRouter>
      </LingoProvider>
    </BearProvider>,
  );
}

afterEach(() => {
  cleanup();
});

describe('AppRoutes', () => {
  it('shows the platform at /', () => {
    renderPath(ROUTE_PLATFORM);
    expect(screen.getByText('הכל לרכב שלך. במקום אחד.')).toBeTruthy();
    expect(screen.getByText('ניהול הדירה')).toBeTruthy();
    expect(screen.getByText('ניהול הדירה עדיין לא זמין.')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'בקרוב' })).toHaveProperty('disabled', true);
  });

  it('sends unsigned /car and /property to auth', () => {
    renderPath(ROUTE_CAR);
    expect(screen.getByText('התחברות לחשבון')).toBeTruthy();
    renderPath(ROUTE_PROPERTY);
    expect(screen.getAllByText('התחברות לחשבון').length).toBeGreaterThan(0);
  });

  it('redirects /welcome to the platform', () => {
    renderPath(ROUTE_WELCOME);
    expect(screen.getByText('הכל לרכב שלך. במקום אחד.')).toBeTruthy();
  });

  it('maps named product routes onto the apps', () => {
    renderPath(ROUTE_CARLIFE);
    expect(screen.getByText('התחברות לחשבון')).toBeTruthy();
    cleanup();
    renderPath(ROUTE_APARTMENT);
    expect(screen.getByText('התחברות לחשבון')).toBeTruthy();
  });

  it('keeps /auth on the shared login', () => {
    renderPath(ROUTE_AUTH);
    expect(screen.getByText('התחברות לחשבון')).toBeTruthy();
  });
});
