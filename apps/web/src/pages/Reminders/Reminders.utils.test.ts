import { describe, expect, it } from 'vitest';
import { formatDisplayDate } from './Reminders.utils';

describe('formatDisplayDate', () => {
  it('keeps empty and invalid values', () => {
    expect(formatDisplayDate('', 'he')).toBe('');
    expect(formatDisplayDate('not-a-date', 'he')).toBe('not-a-date');
  });

  it('formats an ISO date for the locale', () => {
    expect(formatDisplayDate('2026-09-24', 'en')).toMatch(/2026/);
  });
});
