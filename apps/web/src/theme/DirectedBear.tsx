import { BearProvider, ToastContainer, ToastProvider } from '@forgedevstack/bear';
import { useDirection } from '@forgedevstack/lingo/react';
import { BrowserRouter } from 'react-router-dom';
import { ApiErrorHost } from '@components/ApiErrorHost';
import {
  CLM_BEAR_CUSTOM_TYPOGRAPHY,
  CLM_BEAR_CUSTOM_VARIANTS,
  CLM_BEAR_DEFAULT_PROPS,
  CLM_BEAR_THEME,
} from './bear.theme';
import { App } from '../App';

export function DirectedBear() {
  const direction = useDirection();
  return (
    <BearProvider
      mode="light"
      persistPreference={false}
      direction={direction}
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
  );
}
