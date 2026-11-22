import fastify from "fastify";
import dotenv from "dotenv";
import { validateApiEnv } from "@sakuya/schemas";
import fastifyHelmet from "@fastify/helmet";
import fastifyCors from "@fastify/cors";
dotenv.config();

const env = validateApiEnv(process.env);
const app = fastify();

async function main() {
  await app.register(fastifyHelmet, {
    contentSecurityPolicy: false,
  });

  const allowedOrigins = env.CORS_ORIGINS;

  await app.register(fastifyCors, {
    origin: allowedOrigins,
    credentials: true,
  });

  app.get("/health", async () => ({ staus: "ok" }));

  await app.listen({ port: env.PORT, host: "0.0.0.0" });
  console.log("Sever running on port:", env.PORT);
}

main().catch((e) => {
  app.log.error(e);
  process.exit(1);
});
