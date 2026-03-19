import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env, isDev, isTestEnv } from './env.ts';
import { errorHandler, notFound } from './middleware/errorHandler.ts';
import authRoutes from './routes/authRoutes.ts';
import movieRoutes from './routes/movieRoutes.ts';
import personRoutes from './routes/personRoutes.ts';
import userRoutes from './routes/userRoutes.ts';

const app = express();

const HEADERS = {
  'Content-Security-Policy':
    'default-src \'self\';base-uri \'self\';font-src \'self\' https: data:;form-action \'self\';frame-ancestors \'self\';img-src \'self\' data:;object-src \'none\';script-src \'self\';script-src-attr \'none\';style-src \'self\' https: \'unsafe-inline\';upgrade-insecure-requests',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',
  'Origin-Agent-Cluster': '?1',
  'Referrer-Policy': 'no-referrer',
  'Strict-Transport-Security': 'max-age=15552000; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'X-DNS-Prefetch-Control': 'off',
  'X-Download-Options': 'noopen',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Permitted-Cross-Domain-Policies': 'none',
  'X-XSS-Protection': '0',
};

app.use((req, res, next) => {
  res.set(HEADERS);
  next();
});
app.disable('x-powered-by');

// /app.use(helmet());
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

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        service: 'Duncflix Prime API',
    });
});

app.use('/api/auth', authRoutes);

app.use('/api/movies', movieRoutes);
app.use('/api/persons', personRoutes)
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);
export { app };

export default app;
