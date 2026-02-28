import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

export default async function middleware(request: NextRequest) {
    const token = request.cookies.get('color-freak-token')?.value;

    if (!token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    const payload = await verifyToken(token);

    if (!payload) {
        const response = NextResponse.redirect(new URL('/', request.url));
        response.cookies.delete('color-freak-token');
        return response;
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};