import { NextResponse } from 'next/server';

export function middleware(req) {
    const maintenance = process.env.NEXT_PUBLIC_MAINTENANCE === 'true';

    if (
        maintenance &&
        !req.nextUrl.pathname.startsWith('/maintenance')
    ) {
        return NextResponse.rewrite(
            new URL('/maintenance', req.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next|api|images|favicon.ico).*)'],
};
