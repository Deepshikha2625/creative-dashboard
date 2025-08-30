import { NextRequest, NextResponse } from 'next/server';

// List of routes that do not require authentication
const publicRoutes = ['/login', '/_next', '/favicon.ico', '/api'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Check for auth token (adjust as needed for your auth system)
  const token = request.cookies.get('token');

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
