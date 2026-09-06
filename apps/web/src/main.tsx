import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { BearProvider, ToastContainer, ToastProvider } from '@forgedevstack/bear';
import { LingoProvider } from '@forgedevstack/lingo/react';
import '@forgedevstack/bear/styles.css';
import '@forgedevstack/grid-table/grid-table.css';
import { DIRECTION_RTL } from '@const';
import { lingo } from '@locales';
import {
  CLM_BEAR_CUSTOM_TYPOGRAPHY,
  CLM_BEAR_CUSTOM_VARIANTS,
  CLM_BEAR_DEFAULT_PROPS,
  CLM_BEAR_THEME,
} from '@theme';
import { ApiErrorHost } from '@components/ApiErrorHost';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <LingoProvider instance={lingo}>
    <BearProvider
      mode="light"
      persistPreference={false}
      direction={DIRECTION_RTL}
      theme={CLM_BEAR_THEME}
      defaultProps={CLM_BEAR_DEFAULT_PROPS}
      customVariants={CLM_BEAR_CUSTOM_VARIANTS}
      customTypography={CLM_BEAR_CUSTOM_TYPOGRAPHY}
    >
      <ToastProvider>
        <BrowserRouter>
          <ApiErrorHost />
          <App />
        </BrowserRouter>
        <ToastContainer />
      </ToastProvider>
    </BearProvider>
  </LingoProvider>,
);
