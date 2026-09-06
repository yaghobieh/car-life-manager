import { Router } from "express";
import { identityStatusController } from "../controllers/identity.controller";

export function registerIdentityRoutes(router: Router): void {
  router.get("/identity/status", identityStatusController);
}
