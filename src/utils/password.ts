import bcrypt from 'bcrypt';
import env from '../env.ts';

export async function hashPassword (password:string): Promise<string> {
    return await bcrypt.hash(password, env.BCRYPT_ROUNDS);
}

export async function comparePassword(
    password: string,
    hashedPassword: string
): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
}
