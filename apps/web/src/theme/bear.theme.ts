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

export const CLM_BEAR_THEME = {
  colors: {
    primary: 'var(--clm-blue)',
    secondary: COLOR_NAVY,
    success: COLOR_GREEN,
    warning: COLOR_WARNING,
    danger: COLOR_DANGER,
    background: {
      primary: 'var(--clm-paper)',
      secondary: 'var(--clm-paper)',
      tertiary: 'var(--clm-raised)',
    },
    text: {
      primary: 'var(--clm-ink)',
      secondary: 'var(--clm-muted)',
      muted: 'var(--clm-muted)',
      inverted: COLOR_WHITE,
    },
    border: {
      default: 'var(--clm-line)',
      subtle: 'var(--clm-line)',
      strong: 'var(--clm-line-strong)',
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
