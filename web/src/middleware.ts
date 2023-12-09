import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
	let cookie = request.cookies.get("access_token");

	if (request.nextUrl.pathname.startsWith("/login") && cookie) {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	if (request.nextUrl.pathname.startsWith("/dashboard") && !cookie) {
		return NextResponse.redirect(new URL("/login", request.url));
	}
}

export const config = {
	matcher: ["/login", "/dashboard/:path*"],
};
