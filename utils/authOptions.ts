import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { jwtDecode } from "jwt-decode";
export const authOptions : NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith", value: "administrator" },
        password: { label: "Password", type: "password", value: "admin" },
        locale: { label: "Locale", type: "text" },
        ip: {label: "IP", type: "text"}
      },
      // @ts-ignore
      async authorize(credentials, req) {
        // Check if credentials are undefined
        if (!credentials) {
          console.error("Credentials are missing");
          return null;
        }
        const currentLocale = credentials?.locale || 'uk';
        // Include hidden values here
        const data = {
          username: credentials.username,
          password: credentials.password,
          ip: credentials.ip
        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/login_check`, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            "locale": currentLocale
          }
        });
        const resData = await res.json();
        if (res.ok && resData.token) {
          return { token: resData.token };
        } else {
          throw new Error(resData.message || "Authentication failed");
        }

      }
    })
  ],
  pages: {
    signIn: '/authentication/signin'
  },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (token?.token) {
        const decoded = jwtDecode<any>(token.token);
        token.username = decoded?.username ?? null;
      }
      return { ...token, ...user };
    },
    async session ({ session, token }) {
      session.user = {
        ...session.user,
        jwt: token.token,
        username: token.username ?? "",
      };
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET

};
