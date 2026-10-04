import {
  COLOR_DANGER,
  COLOR_GREEN,
  COLOR_WARNING,
  THEME_MODE_DARK,
} from '@const';
import { CLM_BEAR_THEME } from './bear.theme';

const GRID_THEME_LIGHT = 'light' as const;
const GRID_THEME_DARK = 'dark' as const;

export function clmGridTheme(mode: string) {
  return {
    mode: mode === THEME_MODE_DARK ? GRID_THEME_DARK : GRID_THEME_LIGHT,
    colors: CLM_GRID_THEME.colors,
  };
}

export const CLM_GRID_THEME = {
  colors: {
    background: {
      primary: 'var(--clm-raised)',
      secondary: 'var(--clm-raised-2)',
      tertiary: 'var(--clm-raised)',
      hover: 'var(--clm-blue-soft)',
    },
    text: {
      primary: 'var(--clm-ink)',
      secondary: 'var(--clm-muted)',
      muted: 'var(--clm-muted-2)',
    },
    border: {
      default: 'var(--clm-line)',
      hover: 'var(--clm-blue)',
    },
    accent: {
      primary: 'var(--clm-blue)',
      success: COLOR_GREEN,
      warning: COLOR_WARNING,
      error: COLOR_DANGER,
    },
  },
};

export const CLM_GRID_BEAR_OVERRIDE = CLM_BEAR_THEME;
