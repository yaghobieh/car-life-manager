import type { ElementType } from 'react';
import type { BearThemeOverride } from '@forgedevstack/bear';
import {
  COLOR_BLUE,
  COLOR_DANGER,
  COLOR_GREEN,
  COLOR_NAV_HOVER,
  COLOR_NAV_TEXT,
  COLOR_NAVY,
  COLOR_NAVY_DEEP,
  COLOR_TRANSPARENT,
  COLOR_WARNING,
  COLOR_WHITE,
  FONT_FAMILY,
  FONT_FAMILY_EN,
  LOCALE_EN,
  FONT_SIZE_PAGE_TITLE,
  FONT_SIZE_SECTION_TITLE,
  FONT_WEIGHT_BOLD,
  FONT_WEIGHT_EXTRABOLD,
  LINE_HEIGHT_TIGHT,
  THEME_RADIUS_2XL,
  THEME_RADIUS_LG,
  THEME_RADIUS_XL,
  THEME_SHADOW_LG,
  THEME_SHADOW_MD,
  THEME_SHADOW_SM,
  TYPO_PAGE_TITLE,
  TYPO_SECTION_TITLE,
  VARIANT_NAV,
  VARIANT_NAV_ACTIVE,
} from '@const';

const BEAR_COLOR_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

function bearSolidScale(color: string): Record<string, string> {
  return Object.fromEntries(BEAR_COLOR_STEPS.map((step) => [String(step), color]));
}

const TAVO_PRIMARY_SCALE = {
  50: '#E6F5F4',
  100: '#CCEAE9',
  200: '#99D5D2',
  300: '#66C0BC',
  400: '#33ABA5',
  500: '#0B7A75',
  600: '#096964',
  700: '#075551',
  800: '#05423F',
  900: '#032E2C',
  950: '#021F1E',
};

const TAVO_SECONDARY_SCALE = {
  50: '#FFF9E6',
  100: '#FFF3CC',
  200: '#FFE799',
  300: '#FFDB66',
  400: '#FFCF33',
  500: '#FFB627',
  600: '#E09C15',
  700: '#B37A09',
  800: '#875A03',
  900: '#5C3C00',
  950: '#3E2700',
};

export const CLM_BEAR_THEME = {
  colors: {
    primary: TAVO_PRIMARY_SCALE,
    secondary: TAVO_SECONDARY_SCALE,
    success: bearSolidScale(COLOR_GREEN),
    warning: bearSolidScale(COLOR_WARNING),
    danger: bearSolidScale(COLOR_DANGER),
    background: {
      primary: 'var(--clm-paper, #ffffff)',
      secondary: 'var(--clm-paper, #f8fafc)',
      tertiary: 'var(--clm-raised, #f1f5f9)',
    },
    text: {
      primary: 'var(--clm-ink, #0f172a)',
      secondary: 'var(--clm-muted, #475569)',
      muted: 'var(--clm-muted, #64748b)',
      inverted: COLOR_WHITE,
    },
    border: {
      default: 'var(--clm-line, #e2e8f0)',
      subtle: 'var(--clm-line, #f1f5f9)',
      strong: 'var(--clm-line-strong, #cbd5e1)',
    },
  },
  typography: {
    fontFamily: {
      sans: FONT_FAMILY,
    },
  },
  borderRadius: {
    lg: THEME_RADIUS_LG,
    xl: THEME_RADIUS_XL,
    '2xl': THEME_RADIUS_2XL,
  },
  shadows: {
    sm: THEME_SHADOW_SM,
    md: THEME_SHADOW_MD,
    lg: THEME_SHADOW_LG,
  },
} as BearThemeOverride;

export const CLM_BEAR_CUSTOM_VARIANTS = {
  [VARIANT_NAV]: {
    bg: COLOR_NAVY_DEEP,
    bgHover: COLOR_NAV_HOVER,
    text: COLOR_NAV_TEXT,
    border: COLOR_NAVY_DEEP,
  },
  [VARIANT_NAV_ACTIVE]: {
    bg: COLOR_BLUE,
    bgHover: COLOR_BLUE,
    text: COLOR_WHITE,
    border: COLOR_BLUE,
  },
  tavoNav: {
    bg: 'transparent',
    bgHover: 'var(--neutral-100, #f1f5f9)',
    text: 'var(--neutral-700, #334155)',
    border: 'transparent',
  },
  tavoNavActive: {
    bg: 'var(--cat-soft, #e6f5f4)',
    bgHover: 'var(--cat-soft, #e6f5f4)',
    text: 'var(--cat-ink, #075551)',
    border: 'transparent',
  },
  tavoPublish: {
    bg: '#0B7A75',
    bgHover: '#075551',
    text: '#ffffff',
    border: '#0B7A75',
  },
  tavoSearch: {
    bg: '#FFB627',
    bgHover: '#e09c15',
    text: '#1e293b',
    border: '#FFB627',
  },
  link: {
    bg: 'transparent',
    bgHover: 'transparent',
    text: 'inherit',
    border: 'transparent',
  },
  ghost: {
    bg: 'transparent',
    bgHover: 'rgba(0, 0, 0, 0.05)',
    text: 'inherit',
    border: 'transparent',
  },
};

export function fontFamilyForLocale(locale: string): string {
  return locale === LOCALE_EN ? FONT_FAMILY_EN : FONT_FAMILY;
}

export function bearThemeForLocale(locale: string): BearThemeOverride {
  return {
    ...CLM_BEAR_THEME,
    typography: {
      fontFamily: {
        sans: fontFamilyForLocale(locale),
      },
    },
  };
}

export const CLM_BEAR_CUSTOM_TYPOGRAPHY = {
  [TYPO_PAGE_TITLE]: {
    fontSize: FONT_SIZE_PAGE_TITLE,
    fontWeight: FONT_WEIGHT_EXTRABOLD,
    lineHeight: LINE_HEIGHT_TIGHT,
    fontFamily: FONT_FAMILY,
    component: 'h1' as ElementType,
  },
  [TYPO_SECTION_TITLE]: {
    fontSize: FONT_SIZE_SECTION_TITLE,
    fontWeight: FONT_WEIGHT_BOLD,
    lineHeight: LINE_HEIGHT_TIGHT,
    fontFamily: FONT_FAMILY,
    component: 'h2' as ElementType,
  },
};

export function bearTypographyForLocale(locale: string) {
  const fontFamily = fontFamilyForLocale(locale);
  return {
    [TYPO_PAGE_TITLE]: {
      ...CLM_BEAR_CUSTOM_TYPOGRAPHY[TYPO_PAGE_TITLE],
      fontFamily,
    },
    [TYPO_SECTION_TITLE]: {
      ...CLM_BEAR_CUSTOM_TYPOGRAPHY[TYPO_SECTION_TITLE],
      fontFamily,
    },
  };
}

export const CLM_BEAR_DEFAULT_PROPS = {
  Card: {
    variant: 'elevated',
    radius: 'xl',
    padding: 'lg',
  },
  Select: {
    size: 'md',
  },
  Input: {
    size: 'md',
  },
};

export const CLM_BEAR_COMPONENTS = {
  Button: {
    primary: {
      bg: '#0B7A75',
      bgHover: '#075551',
      bgActive: '#05423F',
      text: COLOR_WHITE,
      border: '#0B7A75',
    },
    ghost: {
      bg: COLOR_TRANSPARENT,
      bgHover: 'rgba(0, 0, 0, 0.05)',
      text: 'inherit',
      border: COLOR_TRANSPARENT,
    },
  },
};
