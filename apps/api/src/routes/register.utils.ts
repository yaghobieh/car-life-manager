import { healthCheck, httpLogger } from "@forgedevstack/harbor";
import type { HarborServer } from "@forgedevstack/harbor";
import { API_MOUNT, HEALTH_PATH } from "../constants/http.const";
import { allowFrontend, errorHandler, sessionMiddleware } from "../middlewares";
import { apiRouter } from "./index";

export function registerServerRoutes(server: HarborServer): void {
  server.addMiddleware(allowFrontend);
  server.addMiddleware(httpLogger());
  server.get(HEALTH_PATH, healthCheck());
  server.addMiddleware(sessionMiddleware);
  server.app.use(API_MOUNT, apiRouter);
  server.app.use(errorHandler);
}
