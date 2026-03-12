import type { Request, Response, NextFunction } from 'express';
import env from '../env.ts';

export type CustomError = Error & {
    status?: number;
    code?: string;
};

export function errorHandler(
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error(err.stack);

    let status = err.status || 500;
    let message = err.message || 'Internal Server Error';

    if (err.name === 'ValidationError') {
        status = 400;
        message = 'Validation Error';
    }

    if (err.name === 'Unauthorised Error') {
        status = 401;
        message = 'Unauthorised';
    }

    res.status(status).json({
        error: message,
        ...(env.APP_STAGE === 'dev' && {
            stack: err.stack,
            details: err.message,
        }),

    });
}

export function notFound(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const error = new Error(`Not found - ${req.originalUrl}`) as CustomError;
    error.status = 400;
    next(error);
}
