import { Router } from "express";
import { asyncRoute } from "../middlewares";
import {
  googleCallbackController,
  googleStartController,
  clerkSyncController,
  loginController,
  logoutController,
  meController,
  registerController,
  updateProfileController,
} from "../controllers/auth.controller";

export function registerAuthRoutes(router: Router): void {
  router.post("/auth/register", asyncRoute(registerController));
  router.post("/auth/login", asyncRoute(loginController));
  router.post("/auth/logout", asyncRoute(logoutController));
  router.get("/auth/me", asyncRoute(meController));
  router.patch("/auth/me", asyncRoute(updateProfileController));
  router.post("/auth/clerk", asyncRoute(clerkSyncController));
  router.get("/auth/google", asyncRoute(googleStartController));
  router.get("/auth/google/callback", asyncRoute(googleCallbackController));
}
