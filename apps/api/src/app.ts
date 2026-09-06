import express from "express";
import { createServer } from "@forgedevstack/harbor";
import type { HarborServer } from "@forgedevstack/harbor";
import { config } from "./config";
import { registerServerRoutes } from "./routes/register.utils";

export function createClmServer(): HarborServer {
  const server = createServer({
    port: config.port,
    host: config.host,
    autoStart: false,
  });
  registerServerRoutes(server);
  return server;
}

export const clmServer = createClmServer();
const app: express.Express = clmServer.app;

export default app;
