import { Router } from "express";
import { registerIdentityRoutes } from "./identity.routes";
import { registerTaskRoutes } from "./tasks.routes";
import { registerVehicleRoutes } from "./vehicles.routes";

export const apiRouter = Router();

registerVehicleRoutes(apiRouter);
registerTaskRoutes(apiRouter);
registerIdentityRoutes(apiRouter);
