import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
  type DefaultUser,
} from "next-auth";
import GithubProvider from "next-auth/providers/github";

import { env } from "@/env.mjs";
import { db } from "@/server/db/index";
import { USER_ROLE, UserRole } from "@/lib/types";
import { DefaultJWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import { compare, hash } from "bcrypt";
import { DrizzleAdapter } from "./my-drizzle-adapter";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role?: UserRole;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    role?: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends Record<string, unknown>, DefaultJWT {
    id: string;
    role?: UserRole;
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    // maxAge: 30 * 24 * 60 * 60, // 30 days // default
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      const dbUser = await db.query.users.findFirst({
        where: (user, { eq }) => eq(user.email, token.email || ""),
      });
      if (!dbUser) {
        throw new Error(`User with email = ${token.email} not found!`);
      }
      token.role = dbUser.role ?? undefined;
      token.id = dbUser.id;
      return token;
    },
    async session({ session, user, token }) {
      if (token) {
        session.user.role = token.role || USER_ROLE.USER;
        session.user.id = token.id;
      }
      return session;
    },
  },
  adapter: DrizzleAdapter(db),
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "johndoe@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "**********",
        },
      },
      async authorize(credentials, req) {
        // console.log("credentials");
        // console.log(credentials);
        if (!credentials || !credentials.password || !credentials.email) {
          throw new Error("Invalid input credentials");
        }
        const dbUser = await db.query.users.findFirst({
          where: (user, { eq }) => eq(user.email, credentials.email),
        });
        if (!dbUser) {
          throw new Error(`User with email = ${credentials.email} not found!`);
        }
        const isValid =
          dbUser.password && compare(credentials.password, dbUser.password);
        if (isValid) {
          return {
            id: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            image: dbUser.image,
          };
        } else {
          throw new Error("Invalid credentials. Try again.");
        }
      },
    }),

    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
