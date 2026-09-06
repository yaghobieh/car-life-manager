import type { BearThemeOverride } from '@forgedevstack/bear';
import {
  COLOR_BG,
  COLOR_BLUE,
  COLOR_CARD,
  COLOR_INK,
  COLOR_LINE,
  COLOR_MUTED,
  FONT_FAMILY,
} from '@const';

export const CLM_BEAR_THEME: BearThemeOverride = {
  colors: {
    primary: {
      500: COLOR_BLUE,
      600: COLOR_BLUE,
    },
    background: {
      primary: COLOR_CARD,
      secondary: COLOR_BG,
      tertiary: COLOR_BG,
    },
    text: {
      primary: COLOR_INK,
      secondary: COLOR_MUTED,
      muted: COLOR_MUTED,
    },
    border: {
      default: COLOR_LINE,
    },
  },
  typography: {
    fontFamily: {
      sans: FONT_FAMILY,
    },
  },
};
