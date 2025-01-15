import { NextResponse } from "next/server";

export async function middleware(request) {
  //return NextResponse.redirect(new URL("/", request.url));
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/users/:path*", "/api/branchs/:path*"],
};
