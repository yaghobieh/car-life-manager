import { config, isDevelopment } from "../config";
import { LOG_PREFIX } from "./logger.const";
import type { Logger } from "./logger.types";

function logsEnabled(): boolean {
  return isDevelopment() || config.enableLogs;
}

const ANSI_TEAL = "\x1b[38;2;11;122;117m\x1b[1m";
const ANSI_RESET = "\x1b[0m";
const ANSI_COLORS: Record<string, string> = {
  debug: "\x1b[35m",
  info: "\x1b[36m",
  warn: "\x1b[33m",
  error: "\x1b[31m\x1b[1m",
};

function write(method: "debug" | "info" | "warn" | "error", args: unknown[]): void {
  if (method !== "error" && !logsEnabled()) return;
  const badge = `${ANSI_TEAL}[Tavo]${ANSI_RESET} ${ANSI_COLORS[method] || ""}[${method.toUpperCase()}]${ANSI_RESET}`;
  console[method](badge, ...args);
}

export const logger: Logger = {
  debug: (...args) => write("debug", args),
  info: (...args) => write("info", args),
  warn: (...args) => write("warn", args),
  error: (...args) => write("error", args),
};
