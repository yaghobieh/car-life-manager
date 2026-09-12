import {
  COLOR_DANGER,
  COLOR_GREEN,
  COLOR_WARNING,
} from '@const';
import { CLM_BEAR_THEME } from './bear.theme';

export const CLM_GRID_THEME = {
  mode: 'light' as const,
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
