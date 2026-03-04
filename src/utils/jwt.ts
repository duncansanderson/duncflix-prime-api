import { SignJWT, jwtVerify, decodeJwt } from 'jose';
import { createSecretKey } from 'crypto';
import env from '../env.ts';

export type JwtPayload = {
    id: string;
    email: string;
    username: string;
};

export const generateToken = async (payload: JwtPayload): Promise<string> => {
    const secret = env.JWT_SECRET;
    const secretKey = createSecretKey(secret, 'utf-8');

    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(env.JWT_EXPIRES_IN || '7d')
        .sign(secretKey);
};
