import type { ReactNode } from 'react';
import { BearProvider } from '@forgedevstack/bear';
import type { BearDirection } from '@forgedevstack/bear';
import { THEME_MODE_LIGHT, THEME_STORAGE_KEY } from '@const';
import {
  CLM_BEAR_COMPONENTS,
  CLM_BEAR_CUSTOM_VARIANTS,
  CLM_BEAR_DEFAULT_PROPS,
  bearThemeForLocale,
  bearTypographyForLocale,
} from './bear.theme';
import { ThemeDocumentSync } from './ThemeDocumentSync';

export interface TavoBearProviderProps {
  children: ReactNode;
  locale: string;
  direction: BearDirection;
}

/** Single place where Tavo theming is applied: palette, variants, typography and default props. */
export function TavoBearProvider({ children, locale, direction }: TavoBearProviderProps) {
  return (
    <BearProvider
      defaultMode={THEME_MODE_LIGHT}
      persistPreference
      storageKey={THEME_STORAGE_KEY}
      direction={direction}
      theme={bearThemeForLocale(locale)}
      components={CLM_BEAR_COMPONENTS}
      defaultProps={CLM_BEAR_DEFAULT_PROPS}
      customVariants={CLM_BEAR_CUSTOM_VARIANTS}
      customTypography={bearTypographyForLocale(locale)}
    >
      <ThemeDocumentSync />
      {children}
    </BearProvider>
  );
}
