import { env } from "@/env.mjs";
import { type Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  driver: "mysql2",
  dbCredentials: {
    uri: env.DATABASE_URL,
  },
  tablesFilter: ["td_*"],
} satisfies Config;
