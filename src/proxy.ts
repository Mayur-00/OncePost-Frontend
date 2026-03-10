import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export default async function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken")?.value;
    const isOnboarded = request.cookies.get("op-iob")?.value;
  const path = request.nextUrl.pathname;
  const isPublic =
    path === "/sign-in" ||
    path === "/sign-up" ||
    path === "/verifyemail" ||
    path === "/" ||
    path === "/error";

const isFree = path === "/privacy-policy" || path === "/help" || path === "/terms" || path ==="/pricing" || path==="/integrations" || path==="/features"

  if (
    path.startsWith("/_next/") ||
    path.startsWith("/api/") ||
    path.startsWith("/static/") ||
    path.includes(".") // This catches .css, .js, .png, .jpg, etc.
  ) {
    return NextResponse.next();
    };

    if(!refreshToken && isFree){
       return NextResponse.next();
    }
    if(refreshToken && isFree){
       return NextResponse.next();
    }

    if (isPublic && refreshToken) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    if (!isPublic && refreshToken) {
      return NextResponse.next();
    }
     if (!isOnboarded && refreshToken) {
    return NextResponse.redirect(new URL('/onboarding', request.url));
  }

    if (!isPublic && !refreshToken) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    

   
    return NextResponse.next();
  }

export const config = {
  matcher: ["/:path*", "/"],
};
