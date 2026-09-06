import { PrismaClient } from "@prisma/client";
import { HTTP_UNAVAILABLE } from "../constants/http.const";
import { HttpError } from "../errors/http-error";

const globalForPrisma = globalThis as { clmPrisma?: PrismaClient };

function createPrisma(): PrismaClient {
  if (!process.env.DATABASE_URL) {
    throw new HttpError("DATABASE_URL is not set", HTTP_UNAVAILABLE, "db_unconfigured");
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
