import NextAuth, {
  type DefaultSession,
  type User as NextAuthUser,
} from "next-auth";

// Extending the User type to include the role
export type ExtendedUser = NextAuthUser & {
  role: "admin" | "user";
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
  interface User extends ExtendedUser {}
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    role: "admin" | "user";
  }
}
