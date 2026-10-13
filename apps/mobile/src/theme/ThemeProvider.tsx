import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { PALETTE_DARK, PALETTE_LIGHT, type ThemeColors } from './colors.const';

export type ThemeMode = 'light' | 'dark';

interface ThemeContextValue {
  theme: ThemeMode;
  colors: ThemeColors;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  colors: PALETTE_LIGHT,
  toggleTheme: () => {},
  setTheme: () => {},
});

export function ThemeProvider({ children, initial = 'light' }: { children: ReactNode; initial?: ThemeMode }) {
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
