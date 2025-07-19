/* eslint-disable ts/no-require-imports */
import merge from 'lodash.merge';

import env from '../lib/env';

env.NODE_ENV = env.NODE_ENV || 'development';
const stage = env.STAGE || 'local';

let envConfig;

if (stage === 'production') {
    envConfig = require('./prod').default;
} else if (stage === 'staging') {
    envConfig = require('./testing').default;
} else {
    envConfig = require('./local').default;
}

export default merge({
    stage,
    env: env.NODE_ENV,
    port: 3001,
    secrets: {
        jwt: env.JWT_SECRET,
        dbUrl: env.DATABASE_URL,
    },
}, envConfig);
