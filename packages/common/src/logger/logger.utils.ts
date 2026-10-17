import { BOOLEAN_FALSE, LOGS_ENABLED_VALUE, LOGS_STORAGE_KEY } from '@const';
import type { ClmVersion } from './logger.types';
import { VERSION_LOCAL } from './logger.const';

export function readFrontendVersion(): string {
  return import.meta.env.VITE_APP_VERSION ?? '1.0.0';
}

export function readBuildSha(): string {
  return import.meta.env.VITE_BUILD_SHA ?? VERSION_LOCAL;
}

export function isDevRuntime(): boolean {
  return import.meta.env.DEV;
}

export function storedLogsEnabled(): boolean {
  if (typeof window === 'undefined') return BOOLEAN_FALSE;
  return window.localStorage.getItem(LOGS_STORAGE_KEY) === LOGS_ENABLED_VALUE;
}

export function defaultVersion(): ClmVersion {
  return {
    frontend: readFrontendVersion(),
    backend: readFrontendVersion(),
    build: readBuildSha(),
  };
}
