import { z } from 'zod';

import tryParseEnv from './try-parse';

const EnvSchema = z.object({
    NODE_ENV: z.string(),
    DATABASE_URL: z.string(),
    JWT_SECRET: z.string(),
});

export type EnvSchema = z.infer<typeof EnvSchema>;

tryParseEnv(EnvSchema);

export default EnvSchema.parse(process.env);
