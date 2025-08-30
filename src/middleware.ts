import { NextRequest, NextResponse } from 'next/server';


// List of routes that do not require authentication (exact match or prefix for _next/api)
const publicRoutes = ['/login', '/favicon.ico'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;


  // Allow public routes (exact match for /login, /favicon.ico, and prefix for /_next, /api)

  // Redirect '/' to '/login' by default
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  if (
    publicRoutes.includes(pathname) ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api')
  ) {
    return NextResponse.next();
  }


  // Check for auth token (robust for Next.js 13+)
  const token = request.cookies.get('token')?.value;
  if (!token) {
    // Not authenticated, redirect to login
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Authenticated, allow access
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!login|_next|favicon.ico|api).*)'],
};
