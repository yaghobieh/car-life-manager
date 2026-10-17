import type { ReactNode } from 'react';
import type { PALETTE_LIGHT } from './colors.const';

export type ThemeColors = typeof PALETTE_LIGHT;
export type ThemeMode = 'light' | 'dark';

export interface ThemeContextValue {
  theme: ThemeMode;
  colors: ThemeColors;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

export interface ThemeProviderProps {
  children: ReactNode;
  initial?: ThemeMode;
}
