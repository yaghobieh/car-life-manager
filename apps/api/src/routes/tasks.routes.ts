import { Router } from "express";
import { asyncRoute } from "../middlewares";
import { patchTaskController } from "../controllers/tasks.controller";

export function registerTaskRoutes(router: Router): void {
  router.patch("/tasks/:id", asyncRoute(patchTaskController));
}
