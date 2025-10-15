import { Scalar } from '@scalar/hono-api-reference';

import type { AppOpenApi } from './types';

import packageJSON from '../../package.json';

export default function configureOpenApi(app: AppOpenApi) {
    app.doc('/doc', {
        openapi: '3.0.0',
        info: {
            version: packageJSON.version,
            title: 'Duncflix Prime API',
        },
    });

    app.get('/reference', Scalar({
        url: '/doc',
        theme: 'kepler',
        defaultHttpClient: {
            targetKey: 'js',
            clientKey: 'fetch',
        },
    }));
}
