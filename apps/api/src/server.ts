import "./env";
import { config } from "./config";
import { logger } from "./logger";
import app from "./app";

const server = app.listen(config.port, config.host, () => {
  logger.info(`Car Life Manager API http://${config.host}:${config.port}`, {
    version: config.appVersion,
    build: config.buildSha,
  });
});

server.on("error", (error) => {
  logger.error(error);
  process.exit(1);
});
