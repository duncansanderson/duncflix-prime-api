import index from '@/routes/index.route';
import tasks from '@/routes/tasks/tasks.index';

import configureOpenApi from './lib/configure-open-api';
import createApp from './lib/create-app';

const app = createApp();

const routes = [
    index,
    tasks,
];

configureOpenApi(app);
routes.forEach((route) => {
    app.route('/', route);
});

export default app;
