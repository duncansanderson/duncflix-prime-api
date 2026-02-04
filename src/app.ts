import index from '@/routes/index.route';
// import tasks from '@/routes/tasks/tasks.index';
import users from '@/routes/users/users.index';
import videos from '@/routes/videos/videos.index';

import configureOpenApi from './lib/configure-open-api';
import createApp from './lib/create-app';

const app = createApp();

const routes = [
    index,
    users,
    videos,
] as const;

configureOpenApi(app);

routes.forEach((route) => {
    app.route('/', route);
});

export type AppType = typeof routes[number];

export default app;
