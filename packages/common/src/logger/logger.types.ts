export interface ClmVersion {
  frontend: string;
  backend: string;
  build: string;
}

export interface ClmWindowApi {
  enableLogs: () => void;
  disableLogs: () => void;
  logsEnabled: boolean;
  version: ClmVersion;
}

export interface Logger {
  debug: (...args: unknown[]) => void;
  info: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
}
