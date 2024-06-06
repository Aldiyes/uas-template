import NextAuth, { type DefaultSession } from "next-auth";

export type Extendeduser = DefaultSession["user"] & {
  role: UserRole;
};

declare module "next-auth" {
  interface Session {
    user: Extendeduser;
  }
}

import { JWT } from "@auth/core/jwt";
import { UserRole } from "@prisma/client";

declare module "@auth/core/jwt" {
  interface JWT {
    role?: UserRole;
  }
}
