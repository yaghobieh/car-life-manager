import { Router } from "express";
import { RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS } from "../constants/http.const";
import { asyncRoute, rateLimit } from "../middlewares";
import {
  addLawyerController,
  listLawyersController,
  listSavedAddressesController,
  saveAddressController,
  searchAddressesController,
} from "../controllers/property.controller";

export function registerPropertyRoutes(router: Router): void {
  router.get(
    "/property/addresses",
    rateLimit(RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX),
    asyncRoute(searchAddressesController),
  );
  router.get("/property/saved-addresses", asyncRoute(listSavedAddressesController));
  router.post("/property/saved-addresses", asyncRoute(saveAddressController));
  router.get("/property/lawyers", asyncRoute(listLawyersController));
  router.post("/property/lawyers", asyncRoute(addLawyerController));
}
