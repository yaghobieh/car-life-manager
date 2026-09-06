import { Router } from "express";
import { rateLimit } from "@forgedevstack/harbor";
import { RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS } from "../constants/http.const";
import { asyncRoute } from "../middlewares";
import {
  addExpenseController,
  addVehicleController,
  getDashboardController,
  listVehicleExpensesController,
  listVehicleRemindersController,
  listVehicleServicesController,
  listVehicleTasksController,
  listVehiclesController,
  lookupVehicleController,
  removeVehicleController,
} from "../controllers/vehicles.controller";

export function registerVehicleRoutes(router: Router): void {
  router.get(
    "/vehicles/lookup/:registrationNumber",
    rateLimit({ windowMs: RATE_LIMIT_WINDOW_MS, max: RATE_LIMIT_MAX }),
    asyncRoute(lookupVehicleController),
  );
  router.get("/vehicles", asyncRoute(listVehiclesController));
  router.post("/vehicles", asyncRoute(addVehicleController));
  router.get("/vehicles/:id", asyncRoute(getDashboardController));
  router.delete("/vehicles/:id", asyncRoute(removeVehicleController));
  router.get("/vehicles/:id/tasks", asyncRoute(listVehicleTasksController));
  router.get("/vehicles/:id/services", asyncRoute(listVehicleServicesController));
  router.get("/vehicles/:id/expenses", asyncRoute(listVehicleExpensesController));
  router.post("/vehicles/:id/expenses", asyncRoute(addExpenseController));
  router.get("/vehicles/:id/reminders", asyncRoute(listVehicleRemindersController));
}
