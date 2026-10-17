import { useEffect } from 'react';
import { ToastContainer, ToastProvider } from '@forgedevstack/bear';
import { useDirection, useLocale } from '@forgedevstack/lingo/react';
import { BrowserRouter } from 'react-router-dom';
import { ApiErrorHost } from '@tavo/sdk';
import { DIRECTION_LTR, DIRECTION_RTL, LOCALE_HE, TavoBearProvider } from '@tavo/common';
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
    <TavoBearProvider locale={locale} direction={direction}>
      <ToastProvider>
        <BrowserRouter>
          <ApiErrorHost />
          <App />
        </BrowserRouter>
        <ToastContainer />
      </ToastProvider>
    </TavoBearProvider>
  );
}
