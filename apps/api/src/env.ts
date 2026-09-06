import { existsSync } from "node:fs";
import path from "node:path";

const ENV_FILE = ".env";

const candidates = [
  path.resolve(process.cwd(), ENV_FILE),
  path.resolve(process.cwd(), "apps/api", ENV_FILE),
];

const envFile = candidates.find((file) => existsSync(file));
if (envFile) process.loadEnvFile(envFile);
