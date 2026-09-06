import { config, isDevelopment } from "../config";
import { LOG_PREFIX } from "./logger.const";
import type { Logger } from "./logger.types";

function logsEnabled(): boolean {
  return isDevelopment() || config.enableLogs;
}

function write(method: "debug" | "info" | "warn" | "error", args: unknown[]): void {
  if (method !== "error" && !logsEnabled()) return;
  console[method](LOG_PREFIX, ...args);
}

export const logger: Logger = {
  debug: (...args) => write("debug", args),
  info: (...args) => write("info", args),
  warn: (...args) => write("warn", args),
  error: (...args) => write("error", args),
};
