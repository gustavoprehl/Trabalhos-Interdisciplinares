import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
	if (req.nextUrl.pathname.startsWith("/entrar")) {
		if (req.cookies.get("auth_token")?.value)
			return NextResponse.rewrite(new URL("/dashboard", req.url));
	}
	if (
		req.nextUrl.pathname.startsWith("/dashboard") ||
		req.nextUrl.pathname.startsWith("/admin")
	) {
		const token = req.cookies.get("auth_token")?.value;

		if (!token) {
			return NextResponse.rewrite(new URL("/entrar", req.url));
		}

		try {
			return NextResponse.next();
		} catch {
			return NextResponse.rewrite(new URL("/entrar", req.url));
		}
	}
}

export const config = {
	matcher: [
		"/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
	],
};
