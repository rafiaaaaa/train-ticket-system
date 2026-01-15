import { NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE = "access_token";

const PUBLIC_ROUTES = ["/auth"];
const UNPROTECTED_ROUTES = ["/search", "/about", "/contact"];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(AUTH_COOKIE)?.value;

  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  const isUnprotected = UNPROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const authRoutes = !isPublicRoute && !isUnprotected && pathname !== "/";

  if (authRoutes && !token) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
