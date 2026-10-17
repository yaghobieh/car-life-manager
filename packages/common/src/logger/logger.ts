import { API_PREFIX, BOOLEAN_FALSE, BOOLEAN_TRUE, LOGS_ENABLED_VALUE, LOGS_STORAGE_KEY } from '@const';
import { LOG_PREFIX } from './logger.const';
import type { ClmVersion, ClmWindowApi, Logger } from './logger.types';
import { defaultVersion, isDevRuntime, storedLogsEnabled } from './logger.utils';

function logsEnabled(): boolean {
  if (isDevRuntime()) return BOOLEAN_TRUE;
  if (typeof window === 'undefined') return BOOLEAN_FALSE;
  return window.CLM?.logsEnabled === BOOLEAN_TRUE || storedLogsEnabled();
}

const TAVO_BADGE_STYLE = 'background: #0B7A75; color: #FFFFFF; font-weight: bold; padding: 2px 6px; border-radius: 4px;';
const METHOD_STYLES: Record<string, string> = {
  debug: 'color: #8B5CF6; font-weight: 600;',
  info: 'color: #0284C7; font-weight: 600;',
  warn: 'color: #F59E0B; font-weight: bold;',
  error: 'color: #EF4444; font-weight: bold;',
};

function write(method: 'debug' | 'info' | 'warn' | 'error', args: unknown[]): void {
  if (!logsEnabled()) return;
  if (typeof window !== 'undefined') {
    console[method](`%c[Tavo]%c [${method.toUpperCase()}]`, TAVO_BADGE_STYLE, METHOD_STYLES[method], ...args);
  } else {
    console[method](LOG_PREFIX, ...args);
  }
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
