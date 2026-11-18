import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function proxy(request) {

  const sessionCookie = getSessionCookie(request);

  // Login না থাকলে signin page-এ পাঠাবে
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // Login থাকলে requested page access করতে পারবে
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/products/:path*"],
};