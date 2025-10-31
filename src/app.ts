import index from '@/routes/index.route';
import tasks from '@/routes/tasks/tasks.index';

import configureOpenApi from './lib/configure-open-api';
import createApp from './lib/create-app';

const app = createApp();

const routes = [
    index,
    tasks,
] as const;

configureOpenApi(app);

routes.forEach((route) => {
    app.route('/', route);
});

export type AppType = typeof routes[number];

export default app;
