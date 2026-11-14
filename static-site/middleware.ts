import {NextRequest, NextResponse} from "next/server";

/**
 * Return true only for page requests that need the canonical trailing slash.
 * NextURL.pathname is used as-is; its trailing slash is not stripped here.
 */
export function needsTrailingSlashRedirect(pathname: string, method: string): boolean {
  if (method !== "GET" && method !== "HEAD") return false;
  if (pathname === "/" || pathname.endsWith("/")) return false;

  const normalizedPath = pathname.toLowerCase();
  if (
    normalizedPath === "/api" || normalizedPath.startsWith("/api/") ||
    normalizedPath === "/admin" || normalizedPath.startsWith("/admin/") ||
    normalizedPath === "/_next" || normalizedPath.startsWith("/_next/")
  ) return false;

  const lastSegment = pathname.slice(pathname.lastIndexOf("/") + 1);
  if (lastSegment.includes(".")) return false;

  return true;
}

/** Clone the full URL so search parameters remain byte-for-byte represented. */
export function trailingSlashRedirectUrl(sourceUrl: URL): URL {
  const destination = new URL(sourceUrl.toString());
  if (destination.pathname !== "/" && !destination.pathname.endsWith("/")) {
    destination.pathname = `${destination.pathname}/`;
  }
  return destination;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (!needsTrailingSlashRedirect(pathname, request.method)) {
    return NextResponse.next();
  }

  // NextURL.pathname preserves a present trailing slash (covered by tests).
  // Clone retains the original query string; only pathname is changed.
  const destination = trailingSlashRedirectUrl(request.nextUrl);
  return NextResponse.redirect(destination, 308);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|.*\\..*).*)",
  ],
};
