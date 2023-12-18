import { env } from "@/env.mjs";
import { type Config } from "drizzle-kit";

export default {
  schema: "./src/server/db/schema.ts",
  out: "./src/server/db/migrations",
  driver: "mysql2",
  dbCredentials: {
    uri: env.DATABASE_URL,
  },
  tablesFilter: ["td_*"],
} satisfies Config;
