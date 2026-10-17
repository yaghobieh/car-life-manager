import type { Request, Response, NextFunction } from "express";
import {
  DB_UNREACHABLE_CODE,
  DB_UNREACHABLE_MESSAGE,
  HTTP_SERVER_ERROR,
  HTTP_UNAVAILABLE,
  PRISMA_SERVER_CLOSED,
  PRISMA_TIMEOUT,
  PRISMA_UNREACHABLE,
} from "../constants/http.const";
import { logger } from "../logger";

const UNREACHABLE_CODES = new Set([PRISMA_UNREACHABLE, PRISMA_TIMEOUT, PRISMA_SERVER_CLOSED]);

function prismaCode(error: unknown): string | undefined {
  if (typeof error !== "object" || !error) return undefined;
  if ("code" in error && typeof error.code === "string") return error.code;
  if ("errorCode" in error && typeof error.errorCode === "string") return error.errorCode;
  return undefined;
}

export function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction): void {
  const code = prismaCode(error);
  if (code && UNREACHABLE_CODES.has(code)) {
    logger.error(DB_UNREACHABLE_MESSAGE, { status: HTTP_UNAVAILABLE, code: DB_UNREACHABLE_CODE });
    res.status(HTTP_UNAVAILABLE).json({ error: DB_UNREACHABLE_MESSAGE, code: DB_UNREACHABLE_CODE });
    return;
  }
  const status = typeof error === "object" && error && "status" in error
    ? Number((error as { status: number }).status)
    : HTTP_SERVER_ERROR;
  const message = error instanceof Error ? error.message : "Unexpected error";
  const appCode = typeof error === "object" && error && "code" in error
    ? String((error as { code: string }).code)
    : undefined;
  logger.error(message, { status, code: appCode });
  res.status(status || HTTP_SERVER_ERROR).json({ error: message, code: appCode });
}
