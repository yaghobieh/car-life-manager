/// <reference types="vite/client" />

import type { ClmWindowApi } from './logger/logger.types';

interface ImportMetaEnv {
  readonly VITE_APP_VERSION: string;
  readonly VITE_BUILD_SHA: string;
  readonly VITE_CLERK_PUBLISHABLE_KEY?: string;
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
