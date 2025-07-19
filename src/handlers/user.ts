import prisma from '../db';
import { comparePasswords, createJWT, hashPassword } from '../modules/auth';

// Get all users.
export async function getUsers(req, res, next) {
    try {
        const users = await prisma.user.findMany();
        res.json({ users });
    } catch (error) {
        next(error);
    }
}

// Create a user.
export async function createNewUser(req, res, next) {
    try {
        const hash = await hashPassword(req.body.password);

        const user = await prisma.user.create({
            data: {
                username: req.body.username,
                password: hash,
            },
        });

        const token = createJWT(user);
        res.json({ token });
    } catch (error: any) {
        error.type = 'input';
        next(error);
    }
}

// User sign in.
export async function signin(req, res, next) {
    try {
        const user = await prisma.user.findUnique({
            where: { username: req.body.username },
        });

        const isValid = await comparePasswords(req.body.password, user.password);

        if (!isValid) {
            res.status(401);
            res.send('Invalid username or password');
            return;
        }

        const token = createJWT(user);
        res.json({ token });
    } catch (error) {
        console.log(error);
        next();
    }
}
