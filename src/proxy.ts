import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export default async function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const path = request.nextUrl.pathname;
  const isPublic =
    path === "/sign-in" ||
    path === "/sign-up" ||
    path === "/verifyemail" ||
    path === "/" ||
    path === "/error";

  if (
    path.startsWith("/_next/") ||
    path.startsWith("/api/") ||
    path.startsWith("/static/") ||
    path.includes(".") // This catches .css, .js, .png, .jpg, etc.
  ) {
    return NextResponse.next();
    };
    if (isPublic && refreshToken) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
    if (!isPublic && refreshToken) {
      return NextResponse.next();
    }

    if (!isPublic && !refreshToken) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    return NextResponse.next();
  }

export const config = {
  matcher: ["/:path*", "/"],
};
