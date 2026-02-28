import { SignJWT, jwtVerify } from 'jose';

if (!process.env.JWT_SECRET) {
    throw new Error('A variável de ambiente JWT_SECRET não está definida no arquivo .env');
}

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

export async function createToken(userId: string) {
    const token = await new SignJWT({ userId })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(secretKey);

    return token;
}

export async function verifyToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, secretKey);
        return payload;
    } catch (error) {
        console.log(error);
        return null;
    }
}