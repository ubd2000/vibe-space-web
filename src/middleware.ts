import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Get the pathname of the request (e.g. /, /protected)
    const path = request.nextUrl.pathname;

    // Define paths that are protected
    const protectedPaths = ['/buyer', '/creator', '/admin'];

    // Check if the current path starts with any of the protected paths
    const isProtected = protectedPaths.some((prefix) => path.startsWith(prefix));

    if (isProtected) {
        // Check for "user" or "accessToken" in cookies (or headers if applicable) used by client side auth
        // Note: Since we are using localStorage for auth on the client, the middleware (server-side) 
        // might not have access to the token if it's not in a cookie.
        // However, for a simple client-side guard simulation or if we migrate to cookies later:

        // For now, since we implemented localStorage based auth, real protection happens on client-side or 
        // we need to set a cookie on login.
        // Let's assume for this step we will enforce client-side redirection for now in the layout
        // OR we can check for a cookie if we decide to set one.

        // Strategy: We will stick to Client-Side protection for dashboards for now because we used localStorage.
        // Middleware is powerful but requires cookies. 
        // Let's rely on a Client Component wrapper/hook for dashboard protection 
        // OR switch login to set a cookie.

        // Given the current implementation (localStorage), middleware cannot see the token.
        // So this middleware file is a placeholder for future cookie migration.
        // I will implementation a AuthGuard component instead.
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
