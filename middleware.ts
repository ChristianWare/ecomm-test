import { withAuth } from "next-auth/middleware";
import { IUser } from "./backend/models/user";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const url = req?.nextUrl?.pathname;
    const user = req?.nextauth?.token?.user as IUser;

    // Logging for debugging purposes
    console.log(`Requested URL: ${url}`);
    console.log(`User Role: ${user?.role}`);

    // Authorize roles
    if (url?.startsWith("/admin") && user?.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Protect account page route
    if (url === "/account" && !user) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/me/:path*", "/bookings/:path*", "/admin/:path*", "/account"],
};
