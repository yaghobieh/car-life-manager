/// <reference types="vite/client" />

import type { ClmWindowApi } from './logger/logger.types';

interface ImportMetaEnv {
  readonly VITE_APP_VERSION: string;
  readonly VITE_BUILD_SHA: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  interface Window {
    enableLogs: () => void;
    CLM: ClmWindowApi;
  }
}

export {};
