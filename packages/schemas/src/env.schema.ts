import { z } from "zod";

const apiEnvSchema = z.object({
  PORT: z.coerce.number().min(4, "el Puerto debe ser de almenos 4 digitos"),
  CORS_ORIGINS: z.url(),
});

export type EnvInput = z.infer<typeof apiEnvSchema>;

export function validateApiEnv(env: Record<string, unknown>): EnvInput {
  const parsed = apiEnvSchema.safeParse(env);
  if (!parsed.success) {
    console.error("Variables de entorno no establecidas en apps/api");
    console.error(parsed.error.flatten().fieldErrors);
    process.exit(1);
  }
  return parsed.data;
}
