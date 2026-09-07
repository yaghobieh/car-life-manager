import { Router } from "express";
import { metaController } from "../controllers/meta.controller";
import { registerAuthRoutes } from "./auth.routes";
import { registerIdentityRoutes } from "./identity.routes";
import { registerTaskRoutes } from "./tasks.routes";
import { registerPropertyRoutes } from "./property.routes";
import { registerVehicleRoutes } from "./vehicles.routes";

export const apiRouter = Router();

apiRouter.get("/meta", metaController);
registerAuthRoutes(apiRouter);
registerVehicleRoutes(apiRouter);
registerTaskRoutes(apiRouter);
registerIdentityRoutes(apiRouter);
registerPropertyRoutes(apiRouter);
