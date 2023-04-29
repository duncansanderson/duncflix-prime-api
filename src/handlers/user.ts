import prisma from '../db';
import { createJWT, hashPassword, comparePasswords } from '../modules/auth';

// Get all users.
export const getUsers = async (req, res, next) => {
    try {
        const users = await prisma.user.findMany();
        res.json({ users });
    } catch (error) {
        next(error);
    }
};

// Create a user.
export const createNewUser = async (req, res, next) => {
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
    } catch (error) {
        error.type = 'input';
        next(error);
    }
};

// User sign in.
export const signin = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: { username: req.body.username }
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
        next();
    }
};
