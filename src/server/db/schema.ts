import { sql } from "drizzle-orm";
import {
  bigint,
  boolean,
  index,
  int,
  mysqlTableCreator,
  primaryKey,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";
import { AdapterAccount } from "next-auth/adapters";
/**
 * For db fields: Use camelCase in ts and snake_case in mysql, except wherever nextauth interferes!
 */

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mysqlTable = mysqlTableCreator((name) => `td_${name}`);

export const todos = mysqlTable(
  "todo",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: varchar("name", { length: 256 }),
    completed: boolean("completed").default(false).notNull(),
    authorId: varchar("author_id", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
  },
  (example) => ({
    authorIdIdx: index("author_id_idx").on(example.authorId),
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const users = mysqlTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: timestamp("email_verified", {
    mode: "date",
    fsp: 3,
  }).default(sql`CURRENT_TIMESTAMP(3)`),
  image: varchar("image", { length: 255 }),
  role: varchar("role", { length: 255, enum: ["User", "Admin"] }),
  password: varchar("password", { length: 255 }),
});

export const accounts = mysqlTable(
  "account",
  {
    id: varchar("id", { length: 255 }).notNull().primaryKey(),
    userId: varchar("userId", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 }).notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", {
      length: 255,
    }).notNull(),
    access_token: varchar("access_token", { length: 255 }),
    expires_at: int("expires_at"),
    refresh_token: varchar("refresh_token", { length: 255 }),
    refresh_token_expires_at: int("refresh_token_expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: varchar("id_token", { length: 255 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  },
  (account) => ({
    providerProviderAccountIdIndex: uniqueIndex(
      "accounts__provider__providerAccountId__idx",
    ).on(account.provider, account.providerAccountId),
    userIdIndex: index("accounts__userId__idx").on(account.userId),
  }),
);

export const sessions = mysqlTable(
  "session",
  {
    id: varchar("id", { length: 255 }).notNull().primaryKey(),
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  },
  (session) => ({
    sessionTokenIndex: uniqueIndex("sessions__sessionToken__idx").on(
      session.sessionToken,
    ),
    userIdIndex: index("sessions__userId__idx").on(session.userId),
  }),
);

export const verificationTokens = mysqlTable(
  "verification_token",
  {
    identifier: varchar("identifier", { length: 255 }).notNull().primaryKey(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  },
  (vt) => ({
    tokenIndex: uniqueIndex("verification_tokens__token__idx").on(vt.token),
  }),
);
