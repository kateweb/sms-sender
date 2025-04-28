import createMiddleware from "next-intl/middleware";
import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export const locales = ["en", "uk", "ru"] as const;

const intlMiddleware = createMiddleware({
  locales: locales,
  defaultLocale: "uk",
  localeDetection: false,
});

const authMiddleware = withAuth(
  function onSuccess(req) {
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: "/auth/login",
    },
  }
);

export default function middleware(req: NextRequest) {
  const excludePattern = `^(/(${locales.join("|")}))?/user/?.*$`;
  const publicPathnameRegex = RegExp(excludePattern, "i");
  const isPublicPage = !publicPathnameRegex.test(req.nextUrl.pathname);

  // Determine the locale from the URL
  const { pathname } = req.nextUrl;
  const localeMatch = pathname.match(/^\/(en|uk|ru)/);
  const locale = localeMatch ? localeMatch[1] : 'uk'; // Default to 'uk' if not found

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    const token = req.cookies.get("next-auth.session-token") || req.cookies.get("__Secure-next-auth.session-token"); // Adjust this to your token
    if (!token) {
      const loginUrl = `/${locale}/login/`;
      return NextResponse.redirect(new URL(loginUrl, req.url));
    }
    return (authMiddleware as any)(req);
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};