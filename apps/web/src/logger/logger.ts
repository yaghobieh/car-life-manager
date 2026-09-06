import { API_PREFIX, BOOLEAN_FALSE, BOOLEAN_TRUE, LOGS_ENABLED_VALUE, LOGS_STORAGE_KEY } from '@const';
import { LOG_PREFIX } from './logger.const';
import type { ClmVersion, ClmWindowApi, Logger } from './logger.types';
import { defaultVersion, isDevRuntime, storedLogsEnabled } from './logger.utils';

function logsEnabled(): boolean {
  if (isDevRuntime()) return BOOLEAN_TRUE;
  if (typeof window === 'undefined') return BOOLEAN_FALSE;
  return window.CLM?.logsEnabled === BOOLEAN_TRUE || storedLogsEnabled();
}

function write(method: 'debug' | 'info' | 'warn' | 'error', args: unknown[]): void {
  if (method !== 'error' && !logsEnabled()) return;
  console[method](LOG_PREFIX, ...args);
}

export const logger: Logger = {
  debug: (...args) => write('debug', args),
  info: (...args) => write('info', args),
  warn: (...args) => write('warn', args),
  error: (...args) => write('error', args),
};

function syncWindowFlags(enabled: boolean, version: ClmVersion): void {
  const api: ClmWindowApi = {
    enableLogs,
    disableLogs,
    logsEnabled: enabled,
    version,
  };
  window.CLM = api;
  window.enableLogs = enableLogs;
}

export function enableLogs(): void {
  window.localStorage.setItem(LOGS_STORAGE_KEY, LOGS_ENABLED_VALUE);
  syncWindowFlags(BOOLEAN_TRUE, window.CLM?.version ?? defaultVersion());
  logger.info('logs enabled');
}

export function disableLogs(): void {
  window.localStorage.removeItem(LOGS_STORAGE_KEY);
  syncWindowFlags(isDevRuntime(), window.CLM?.version ?? defaultVersion());
}

export function installClmWindow(): void {
  const version = defaultVersion();
  syncWindowFlags(isDevRuntime() || storedLogsEnabled(), version);
  void fetch(`${API_PREFIX}/meta`, { credentials: 'include' })
    .then((response) => response.json())
    .then((meta: Partial<ClmVersion>) => {
      const next = {
        frontend: version.frontend,
        backend: meta.backend ?? version.backend,
        build: meta.build ?? version.build,
      };
      syncWindowFlags(isDevRuntime() || storedLogsEnabled(), next);
      logger.info('versions', next);
    })
    .catch((error: unknown) => {
      logger.warn('meta unavailable', error);
    });
}
