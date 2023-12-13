import { env } from "@/env.mjs";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  uri: env.DATABASE_URL,
});
export const db = drizzle(connection);
