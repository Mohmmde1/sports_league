// middleware.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Function to get access token from cookies
function getAccessToken() {
  const accessToken = cookies().get("session_access_token")?.value;
  return accessToken;
}

export function middleware(request) {
  const url = request.nextUrl.clone();
  const accessToken = getAccessToken();
  const referrer = request.headers.get('referer');

  // If no access token, redirect to the login page
  if (!accessToken) {
    if (url.pathname !== '/') {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  } else {
    // If authenticated and on the root page, redirect to the upload page
    if (url.pathname === '/') {
      url.pathname = '/upload';
      return NextResponse.redirect(url);
    }
    
    // If authenticated and trying to access /ranking directly, check the referrer
    if (url.pathname === '/ranking') {
      const allowedReferrers = ['/upload', '/ranking'];
      const referrerPathname = new URL(referrer || 'http://dummy').pathname; // Handle referrer being null
      
      if (!allowedReferrers.includes(referrerPathname)) {
        url.pathname = '/upload';
        return NextResponse.redirect(url);
      }
    }
  }

  return NextResponse.next();
}

// Specify paths to apply the middleware
export const config = {
  matcher: ['/', '/upload', '/ranking'], // Apply middleware to these paths
};
