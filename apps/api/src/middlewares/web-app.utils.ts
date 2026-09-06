import { existsSync } from "node:fs";
import path from "node:path";
import {
  API_WORKSPACE_SEGMENTS,
  WEB_INDEX_FILE,
  WEB_PUBLIC_DIR,
} from "../constants/web-app.const";

export function resolveWebRoot(): string | undefined {
  const candidates = [
    path.join(process.cwd(), WEB_PUBLIC_DIR),
    path.join(process.cwd(), ...API_WORKSPACE_SEGMENTS, WEB_PUBLIC_DIR),
  ];
  return candidates.find((dir) => existsSync(path.join(dir, WEB_INDEX_FILE)));
}
