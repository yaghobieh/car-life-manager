import { useEffect } from 'react';
import { useBearMode } from '@forgedevstack/bear';
import { THEME_MODE_DARK, THEME_MODE_LIGHT } from '@const';

export function ThemeDocumentSync() {
  const { mode } = useBearMode();

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = mode;
    root.classList.remove(THEME_MODE_LIGHT, THEME_MODE_DARK);
    root.classList.add(mode);
  }, [mode]);

  return null;
}
