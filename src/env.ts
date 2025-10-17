import type { ZodError } from 'zod';

import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { z } from 'zod';

expand(config());

const EnvSchema = z.object({
    NODE_ENV: z.string().default('development'),
    LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']),
    PORT: z.coerce.number(),
    DATABASE_URL: z.string().url(),
    DATABASE_AUTH_TOKEN: z.string().optional(),
}).superRefine((input, ctx) => {
    if (input.NODE_ENV === 'production' && !input.DATABASE_AUTH_TOKEN) {
        ctx.addIssue({
            code: 'invalid_type',
            expected: 'string',
            received: 'undefined',
            path: ['DATABASE_AUTH_TOKEN'],
            message: 'Must be set when NODE_ENV is \'production\'',
        });
    }
});

export type Env = z.infer<typeof EnvSchema>;

// eslint-disable-next-line import/no-mutable-exports
let env: Env;

try {
    // eslint-disable-next-line node/no-process-env
    env = EnvSchema.parse(process.env);
} catch (e) {
    const error = e as ZodError;
    console.error('Invalid env:');
    console.error(z.flattenError(error).fieldErrors);
    process.exit(1);
}

export default env;
