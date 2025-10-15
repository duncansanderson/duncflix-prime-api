import { serve } from '@hono/node-server';

import app from './app';
import env from './env';

serve({
    fetch: app.fetch,
    port: Number(env.PORT || 3000),
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
});
