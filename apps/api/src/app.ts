import "./env";
import express from "express";
import { registerExpressApp } from "./routes/register.utils";

const app = express();
registerExpressApp(app);

export default app;
