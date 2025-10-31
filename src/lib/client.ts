import { hc } from 'hono/client';

import type { AppType } from '@/app';

const client = hc<AppType>('http://localhost:9999');
console.log(client);
// client.tasks.
