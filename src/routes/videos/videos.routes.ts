import { createRoute, z } from '@hono/zod-openapi';
import * as HttpStatusCodes from 'stoker/http-status-codes';
import { jsonContent } from 'stoker/openapi/helpers';

import { selectVideoSchema } from '@/db/schema';

const tags = ['Videos'];

export const list = createRoute({
    tags,
    path: '/videos',
    method: 'get',
    responses: {
        [HttpStatusCodes.OK]: jsonContent(
            z.array(selectVideoSchema),
            'The list of videos',
        ),
    },
});
