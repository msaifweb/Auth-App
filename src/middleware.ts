// import React from "react";
// import { NextResponse } from "next/server";

// export default function middleware(req: NextResponse) {
//   console.log("auth?", req.cookies.get("accessToken"));
//   //   const cookie = req.cookies.has("accessToken");
//   return NextResponse.next();
// }

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/signin" || path === "/signup";
  const token = request.cookies.get("accessToken")?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/signin", "/signup", "/profile", "/users"],
};
