// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    const isAuth = !!token;

    const protectedPaths = ['/dashboard', '/profile', '/api/private'];

    const pathname = request.nextUrl.pathname;
    const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

    if (isProtected && !isAuth) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/api/:path*",
        "/dashboard/:path*",
        "/profile/:path*",
    ],
};
