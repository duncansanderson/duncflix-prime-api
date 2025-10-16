import { OpenAPIHono } from '@hono/zod-openapi';
import { notFound, onError, serveEmojiFavicon } from 'stoker/middlewares';
import { defaultHook } from 'stoker/openapi';

import type { AppBindings } from '@/lib/types';

import { pinoLog } from '@/middlewares/pino-log';

export function createRouter() {
    return new OpenAPIHono<AppBindings>({
        strict: false,
        defaultHook,
    });
}

export default function createApp() {
    const app = createRouter();
    app.use(serveEmojiFavicon('🍿'));
    app.use(pinoLog());

    app.notFound(notFound);
    app.onError(onError);

    return app;
}
