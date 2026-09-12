import { PrismaClient } from "@prisma/client";
import {
  DB_SQLITE_UNSUPPORTED_MESSAGE,
  DB_UNCONFIGURED_CODE,
  DB_UNSET_MESSAGE,
  HTTP_UNAVAILABLE,
  POSTGRES_URL_PREFIX,
  POSTGRES_URL_PREFIX_SHORT,
} from "../constants/http.const";
import { HttpError } from "../errors/http-error";

const globalForPrisma = globalThis as { clmPrisma?: PrismaClient };

function createPrisma(): PrismaClient {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new HttpError(DB_UNSET_MESSAGE, HTTP_UNAVAILABLE, DB_UNCONFIGURED_CODE);
  }
  if (!url.startsWith(POSTGRES_URL_PREFIX) && !url.startsWith(POSTGRES_URL_PREFIX_SHORT)) {
    throw new HttpError(DB_SQLITE_UNSUPPORTED_MESSAGE, HTTP_UNAVAILABLE, DB_UNCONFIGURED_CODE);
  }
  return new PrismaClient();
}

export function getPrisma(): PrismaClient {
  if (!globalForPrisma.clmPrisma) {
    try {
      globalForPrisma.clmPrisma = createPrisma();
    } catch (error) {
      if (error instanceof HttpError) throw error;
      const message = error instanceof Error ? error.message : "Prisma failed to start";
      throw new HttpError(message, HTTP_UNAVAILABLE, "db_init_failed");
    }
  }
  return globalForPrisma.clmPrisma;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = getPrisma();
    const value = Reflect.get(client, prop, client);
    return typeof value === "function" ? value.bind(client) : value;
  },
});
