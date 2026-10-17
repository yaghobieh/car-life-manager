import {
  COLOR_BG,
  COLOR_BLUE,
  COLOR_CARD,
  COLOR_DANGER,
  COLOR_GREEN,
  COLOR_INK,
  COLOR_LINE,
  COLOR_MUTED,
  COLOR_MUTED_2,
  COLOR_TILE,
  COLOR_WARNING,
} from '@const';
import { CLM_BEAR_THEME } from './bear.theme';

export const CLM_GRID_THEME = {
  mode: 'light' as const,
  colors: {
    background: {
      primary: COLOR_CARD,
      secondary: COLOR_BG,
      tertiary: COLOR_CARD,
      hover: COLOR_TILE,
    },
    text: {
      primary: COLOR_INK,
      secondary: COLOR_MUTED,
      muted: COLOR_MUTED_2,
    },
    border: {
      default: COLOR_LINE,
      hover: COLOR_BLUE,
    },
    accent: {
      primary: COLOR_BLUE,
      success: COLOR_GREEN,
      warning: COLOR_WARNING,
      error: COLOR_DANGER,
    },
  },
};

export const CLM_GRID_BEAR_OVERRIDE = CLM_BEAR_THEME;
