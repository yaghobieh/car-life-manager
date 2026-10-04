/**
 * @tavo/common
 * Centralized theme tokens, palettes, and common utilities for Tavo platform.
 */

export interface ThemeColors {
  primary: string;
  primaryHover: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  danger: string;
  paper: string;
  surface: string;
  surfaceMuted: string;
  border: string;
  text: string;
  textMuted: string;
}

export const TAVO_THEME_LIGHT: ThemeColors = {
  primary: '#2563EB',
  primaryHover: '#1D4ED8',
  secondary: '#0F172A',
  accent: '#FF7A00',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  paper: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceMuted: '#F1F5F9',
  border: '#E2E8F0',
  text: '#0F172A',
  textMuted: '#64748B',
};

export const TAVO_THEME_DARK: ThemeColors = {
  primary: '#3B82F6',
  primaryHover: '#60A5FA',
  secondary: '#1E293B',
  accent: '#FFA133',
  success: '#34D399',
  warning: '#FBBF24',
  danger: '#F87171',
  paper: '#0B0F19',
  surface: '#111827',
  surfaceMuted: '#1F2937',
  border: '#374151',
  text: '#F9FAFB',
  textMuted: '#9CA3AF',
};

export const TAVO_THEME_CARS: ThemeColors = {
  primary: '#4766DB',
  primaryHover: '#3553C7',
  secondary: '#0F172A',
  accent: '#2563EB',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#DC2626',
  paper: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceMuted: '#EEF2FF',
  border: '#E0E7FF',
  text: '#1E1B4B',
  textMuted: '#6366F1',
};

export const BRAND_NAME = 'Tavo';
export const BRAND_NAME_HE = 'טאבו';
export const BRAND_TAGLINE = 'רכב ודירה במקום אחד';

export function formatPrice(num: number): string {
  return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS', maximumFractionDigits: 0 }).format(num);
}

export function formatKm(km: number): string {
  return new Intl.NumberFormat('he-IL').format(km) + ' ק״מ';
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('he-IL').format(num);
}

export const SELLER_TYPE_PRIVATE = 'פרטי';
export const SELLER_TYPE_AGENCY = 'תיווך';

export function resolveSellerTag(sellerType?: string): 'פרטי' | 'תיווך' {
  if (!sellerType) return 'פרטי';
  if (sellerType.includes('תיווך') || sellerType.includes('סוכנות') || sellerType.includes('מורשה')) {
    return 'תיווך';
  }
  return 'פרטי';
}

export * from './constants';
export * from './config';
export * from './logger';
export * from './locales';
export * from './theme';
export * from './common';
export * from './components';
