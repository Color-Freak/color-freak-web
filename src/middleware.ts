import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken, createToken } from '@/lib/auth'; // 1. Importamos o createToken

export default async function middleware(request: NextRequest) {
    const token = request.cookies.get('color-freak-token')?.value;

    if (!token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    const payload = await verifyToken(token);

    // 2. Garantimos que o payload existe e tem o userId para podermos recriar o token
    if (!payload || typeof payload.userId !== 'string') {
        const response = NextResponse.redirect(new URL('/', request.url));
        response.cookies.delete('color-freak-token');
        return response;
    }

    // 3. Em vez de dar o return direto, guardamos o NextResponse em uma variável
    const response = NextResponse.next();

    // 4. RENOVAÇÃO (Sliding Session): Cria um novo token e atualiza o cookie
    const newToken = await createToken(payload.userId);
    
    response.cookies.set('color-freak-token', newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 2 // Empurra a validade para mais 2 horas a partir de AGORA
    });

    return response;
}

export const config = {
    matcher: ['/admin/:path*'],
};