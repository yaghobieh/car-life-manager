import { createServer, healthCheck, httpLogger } from "@forgedevstack/harbor";
import type { Request, Response, NextFunction } from "express";
import { config } from "./config";
import { sessionMiddleware } from "./session";
import { apiRouter } from "./routes";
import { errorHandler } from "./http";
import { prisma } from "./db";

function allowFrontend(req: Request, res: Response, next: NextFunction): void {
  const origin = req.headers.origin;
  if (
    origin === "http://localhost:5173" ||
    origin === "http://127.0.0.1:5173" ||
    origin === "http://localhost:5180" ||
    origin === "http://127.0.0.1:5180" ||
    origin === "http://localhost:5188" ||
    origin === "http://127.0.0.1:5188"
  ) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  }
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }
  next();
}

async function bootstrap() {
  const server = createServer({
    port: config.port,
    host: config.host,
  });

  server.use(allowFrontend);
  server.use(httpLogger());
  server.get("/health", healthCheck());
  server.use(sessionMiddleware);
  server.app.use("/api", apiRouter);
  server.app.use(errorHandler);

  await server.start();
  console.log(`Car Life Manager API http://${config.host}:${config.port}`);
}

bootstrap().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
