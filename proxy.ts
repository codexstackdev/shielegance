import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify, SignJWT } from 'jose';

const SECRET = new TextEncoder().encode(process.env.SECRET_KEY);

async function issueToken() {
  return new SignJWT({ clientApp: 'OfficialWebFrontend', scope: 'public-read' })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('15m')
    .sign(SECRET);
}

export async function proxy(request: NextRequest) {
  const tokenCookie = request.cookies.get('app_session_token');
  const isApiRoute = request.nextUrl.pathname.startsWith('/api/');

  if (!tokenCookie) {
    if (isApiRoute) {
      return NextResponse.json({ success: false, message: 'Session token missing.' }, { status: 401 });
    }

    const newToken = await issueToken();
    const response = NextResponse.next();

    response.cookies.set({
      name: 'app_session_token',
      value: newToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 15 * 60,
    });

    return response;
  }

  try {
    await jwtVerify(tokenCookie.value, SECRET);

    return NextResponse.next();

  } catch (err: any) {
    if (err.code === 'ERR_JWT_EXPIRED') {

      const newToken = await issueToken();

      const response = NextResponse.json(
        { success: false, message: "Token refreshed. Please retry your request." },
        { status: 425 }
      );

      response.cookies.set({
        name: 'app_session_token',
        value: newToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 15 * 60,
      });

      return response;
    }
    return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 403 });
  }
}

export const config = {
  matcher: [
    '/api/v1/kenshie/:path*',
    '/kenshie/loveLetter/:path*',
    '/kenshie/serenade/:path*',
    '/kenshie/loveCapsule/:path*',
    '/kenshie/:path*',
  ],
};