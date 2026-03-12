import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env, isDev, isTestEnv } from './env.ts';
import { errorHandler, notFound } from './middleware/errorHandler.ts';
import authRoutes from './routes/authRoutes.ts';
import movieRoutes from './routes/movieRoutes.ts';
import userRoutes from './routes/userRoutes.ts';

const app = express();

app.use(helmet());
app.use(
    cors({
        origin: env.CORS_ORIGIN,
        credentials: true,
    }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    morgan('dev', {
        skip: () => isTestEnv(),
    }),
);

app.use(notFound);
app.use(errorHandler);x

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        service: 'Duncflix Prime API',
    });
});

app.use('/api/auth', authRoutes);

app.use('/api/movies', movieRoutes);
app.use('/api/users', userRoutes);

export { app };

export default app;
