import { useEffect } from 'react';
import { BearProvider, ToastContainer, ToastProvider } from '@forgedevstack/bear';
import { useDirection, useLocale } from '@forgedevstack/lingo/react';
import { BrowserRouter } from 'react-router-dom';
import { ApiErrorHost } from '@components/ApiErrorHost';
import { DIRECTION_LTR, DIRECTION_RTL, LOCALE_HE } from '@const';
import {
  CLM_BEAR_DEFAULT_PROPS,
  CLM_BEAR_CUSTOM_VARIANTS,
  bearThemeForLocale,
  bearTypographyForLocale,
} from './bear.theme';
import { App } from '../App';

export function DirectedBear() {
  const direction = useDirection();
  const { locale } = useLocale();

  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale || LOCALE_HE;
    root.dir = direction === DIRECTION_LTR ? DIRECTION_LTR : DIRECTION_RTL;
    root.classList.add('light');
  }, [direction, locale]);

  return (
    <BearProvider
      mode="light"
      persistPreference={false}
      direction={direction}
      theme={bearThemeForLocale(locale)}
      defaultProps={CLM_BEAR_DEFAULT_PROPS}
      customVariants={CLM_BEAR_CUSTOM_VARIANTS}
      customTypography={bearTypographyForLocale(locale)}
    >
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
