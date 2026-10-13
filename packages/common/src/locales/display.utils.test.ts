import { describe, expect, it } from 'vitest';
import { BADGE_SUCCESS, BADGE_WARNING } from '@const';
import { providerDisplayName, serviceBadgeVariant, serviceStatusKey, statusKindLabel } from './display.utils';

function t(key: string): string {
  if (key === 'provider_ministry_of_transport') return 'Ministry of Transport';
  if (key === 'status_healthy') return 'Valid';
  return key;
}

describe('display helpers', () => {
  it('translates official provider names and status labels', () => {
    expect(providerDisplayName('ministry-of-transport', 'משרד התחבורה', t)).toBe('Ministry of Transport');
    expect(statusKindLabel('healthy', t)).toBe('Valid');
    expect(serviceStatusKey('official')).toBe('officialPublic');
    expect(serviceBadgeVariant('official')).toBe(BADGE_SUCCESS);
    expect(serviceBadgeVariant('not_supported')).toBe(BADGE_WARNING);
    expect(serviceStatusKey('user_confirmed')).toBe('userConfirmed');
    expect(serviceBadgeVariant('user_confirmed')).toBe(BADGE_SUCCESS);
  });
});
