import "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      username: string;
      jwt?: string;
      userId?: string;
    };
    expires_in?: string;
    error?: string;
  }

  interface User {
    username: string;
    access_token?: string;
    refresh_token?: string;
    expires_on?: number;
    exp?: number;
    iat?: number;
    jti?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    token?: string;
    username?: string;
    userId?: string;
  }
}
