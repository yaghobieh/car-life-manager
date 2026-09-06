import { config } from "./config";
import { prisma } from "./db";
import { logger } from "./logger";
import { createClmServer } from "./app";

async function bootstrap() {
  const server = createClmServer();
  await server.start();
  logger.info(`Car Life Manager API http://${config.host}:${config.port}`, {
    version: config.appVersion,
    build: config.buildSha,
  });
}

bootstrap().catch(async (error) => {
  logger.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
