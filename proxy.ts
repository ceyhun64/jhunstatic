import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALES = ["tr", "en"] as const;
type Locale = (typeof LOCALES)[number];

// Regex: public static files (anything with a file extension)
const PUBLIC_FILE_RE = /\.([^./]+)$/;

// Paths to pass through untouched (no locale injection, no redirect)
const BYPASS_PREFIXES = [
  "/_next",
  "/api",
  "/admin",
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
];

function shouldBypass(pathname: string): boolean {
  return (
    PUBLIC_FILE_RE.test(pathname) ||
    BYPASS_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  );
}

function extractLocale(pathname: string): Locale | null {
  for (const locale of LOCALES) {
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) {
      return locale;
    }
  }
  return null;
}

function detectLocale(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get("accept-language") ?? "";
  const preferred = acceptLanguage.split(",")[0]?.split("-")[0] ?? "";
  return (LOCALES as readonly string[]).includes(preferred)
    ? (preferred as Locale)
    : "tr";
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Static assets, API routes, admin, Next.js internals → pass through as-is
  if (shouldBypass(pathname)) {
    return NextResponse.next();
  }

  const currentLocale = extractLocale(pathname);

  // 2. Locale missing in URL → detect from Accept-Language, redirect once
  if (!currentLocale) {
    const locale = detectLocale(request);
    const redirectUrl = new URL(`/${locale}${pathname}`, request.url);
    return NextResponse.redirect(redirectUrl);
  }

  // 3. Locale present → inject x-locale header so root layout can set <html lang>
  const response = NextResponse.next();
  response.headers.set("x-locale", currentLocale);
  return response;
}

export const config = {
  /*
   * Match all paths EXCEPT:
   *   - _next/static  (static assets)
   *   - _next/image   (image optimisation)
   *   - favicon.ico   (browser icon)
   *   - api/          (API routes — handled by route handlers)
   *   - admin/        (admin panel — locale-free zone)
   *   - Anything with a file extension (public files)
   */
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|api/|admin/|.*\\..*).*)",
  ],
};
