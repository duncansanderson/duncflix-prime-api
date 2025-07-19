import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import env from '../lib/env';

export function comparePasswords(password, hash) {
    return bcrypt.compare(password, hash);
}

export function hashPassword(password) {
    return bcrypt.hash(password, 5);
}

export function createJWT(user) {
    const token = jwt.sign({
        id: user.id,
        username: user.username,
    }, env.JWT_SECRET);

    return token;
}

export function protect(req, res, next) {
    const bearer = req.headers.authorization;

    if (!bearer) {
        res.status(401);
        res.send('Not authorised');
        return;
    }

    const [, token] = bearer.split(' ');
    if (!token) {
        res.status(401);
        res.send('Not authorised');
        return;
    }

    try {
        const payload = jwt.verify(token, env.JWT_SECRET);
        req.user = payload;
        next();
    } catch (error) {
        console.error(error);
        res.status(401);
        res.send('Not authorised');
    }
}
