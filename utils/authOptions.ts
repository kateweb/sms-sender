import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { jwtDecode } from "jwt-decode";

const DEMO_USERNAME = "demo";
const DEMO_PASSWORD = "Demo1234!";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        locale: { label: "Locale", type: "text" },
        ip: { label: "IP", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        if (
          credentials.username === DEMO_USERNAME &&
          credentials.password === DEMO_PASSWORD
        ) {
          return { id: "demo", username: "demo", isDemo: true } as any;
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}api/login_check`,
          {
            method: "POST",
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
              ip: credentials.ip,
            }),
            headers: {
              "Content-Type": "application/json",
              locale: credentials.locale || "uk",
            },
          }
        );

        const resData = await res.json();

        if (res.ok && resData.token) {
          return { token: resData.token } as any;
        }

        throw new Error(resData.message || "Authentication failed");
      },
    }),
  ],
  pages: {
    signIn: "/authentication/signin",
  },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user && (user as any).isDemo) {
        token.username = "demo";
        token.userId = "demo";
        token.isDemo = true;
        return { ...token, ...user };
      }
      if (token?.token) {
        const decoded = jwtDecode<{ username?: string; id?: string }>(
          token.token as string
        );
        token.username = decoded?.username ?? undefined;
        token.userId = decoded?.id ?? undefined;
      }
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        jwt: token.isDemo ? "demo" : (token.token as string),
        username: (token.username as string) ?? "",
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
