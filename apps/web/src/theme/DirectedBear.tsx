import { useEffect } from 'react';
import { BearProvider, ToastContainer, ToastProvider } from '@forgedevstack/bear';
import { useDirection, useLocale } from '@forgedevstack/lingo/react';
import { BrowserRouter } from 'react-router-dom';
import { ApiErrorHost } from '@components/ApiErrorHost';
import { DIRECTION_LTR, DIRECTION_RTL, LOCALE_HE, THEME_MODE_LIGHT, THEME_STORAGE_KEY } from '@const';
import {
  CLM_BEAR_DEFAULT_PROPS,
  CLM_BEAR_CUSTOM_VARIANTS,
  bearThemeForLocale,
  bearTypographyForLocale,
} from './bear.theme';
import { ThemeDocumentSync } from './ThemeDocumentSync';
import { App } from '../App';

export function DirectedBear() {
  const direction = useDirection();
  const { locale } = useLocale();

  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale || LOCALE_HE;
    root.dir = direction === DIRECTION_LTR ? DIRECTION_LTR : DIRECTION_RTL;
  }, [direction, locale]);

  return (
    <BearProvider
      defaultMode={THEME_MODE_LIGHT}
      persistPreference
      storageKey={THEME_STORAGE_KEY}
      direction={direction}
      theme={bearThemeForLocale(locale)}
      defaultProps={CLM_BEAR_DEFAULT_PROPS}
      customVariants={CLM_BEAR_CUSTOM_VARIANTS}
      customTypography={bearTypographyForLocale(locale)}
    >
      <ThemeDocumentSync />
      <ToastProvider>
        <BrowserRouter>
          <ApiErrorHost />
          <App />
        </BrowserRouter>
        <ToastContainer />
      </ToastProvider>
    </BearProvider>
  );
}
