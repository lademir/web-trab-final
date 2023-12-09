import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
	let cookie = request.cookies.get("access_token");

	if (request.nextUrl.pathname.startsWith("/login") && cookie) {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}
	if (request.nextUrl.pathname.startsWith("/dashboard") && !cookie) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	if (request.nextUrl.pathname === "/") {
		// console.log("middleware");
		return NextResponse.redirect(new URL("/login", request.url));
	}
	// console.log(request.nextUrl.pathname);
}

// export const config = {
// 	matcher: ["/login", "/dashboard/:path*"],
// };
