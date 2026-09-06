import { createServer } from "@forgedevstack/harbor";
import { config } from "./config";
import { prisma } from "./db";
import { registerServerRoutes } from "./routes/register.utils";

async function bootstrap() {
  const server = createServer({
    port: config.port,
    host: config.host,
  });

  registerServerRoutes(server);

  await server.start();
  console.log(`Car Life Manager API http://${config.host}:${config.port}`);
}

bootstrap().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
