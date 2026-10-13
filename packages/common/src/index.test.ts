import { describe, it, expect } from 'vitest';
import {
  BRAND_NAME,
  BRAND_NAME_HE,
  BRAND_TAGLINE,
  formatPrice,
  formatKm,
  resolveSellerTag,
  TAVO_THEME_LIGHT,
  TAVO_THEME_DARK,
  TAVO_THEME_CARS,
} from './index';

describe('@tavo/common', () => {
  it('exports valid branding constants', () => {
    expect(BRAND_NAME).toBe('Tavo');
    expect(BRAND_NAME_HE).toBe('טאבו');
    expect(BRAND_TAGLINE).toBe('רכב ודירה במקום אחד');
    expect(TAVO_THEME_LIGHT.primary).toBe('#2563EB');
    expect(TAVO_THEME_DARK.primary).toBe('#3B82F6');
    expect(TAVO_THEME_CARS.primary).toBe('#4766DB');
  });

  it('formats prices correctly', () => {
    const formatted = formatPrice(125000);
    expect(formatted).toContain('125,000');
    expect(formatted).toContain('₪');
  });

  it('formats km correctly with suffix', () => {
    expect(formatKm(45000)).toBe('45,000 ק״מ');
  });

  it('resolves seller tags properly', () => {
    expect(resolveSellerTag('private')).toBe('פרטי');
    expect(resolveSellerTag('מתווך מורשה')).toBe('תיווך');
    expect(resolveSellerTag('סוכנות רכב')).toBe('תיווך');
    expect(resolveSellerTag(undefined)).toBe('פרטי');
  });
});
