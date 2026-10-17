import type { en } from '@locales';

export type LandingTranslationKey = keyof typeof en;

export function tLanding(t: (key: string) => string, key: LandingTranslationKey, fallback?: string): string {
  const val = t(key);
  return val && val !== key ? val : (fallback ?? key);
}

