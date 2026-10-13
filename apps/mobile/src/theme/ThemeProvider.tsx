import React, { createContext, useContext, useState } from 'react';
import { PALETTE_DARK, PALETTE_LIGHT } from './colors.const';
import type { ThemeContextValue, ThemeMode, ThemeProviderProps } from './theme.types';

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  colors: PALETTE_LIGHT,
  toggleTheme: () => {},
  setTheme: () => {},
});

export function ThemeProvider({ children, initial = 'light' }: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeMode>(initial);
  const colors = theme === 'dark' ? PALETTE_DARK : PALETTE_LIGHT;

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
