import { createRoute, z } from '@hono/zod-openapi';
import * as HttpStatusCodes from 'stoker/http-status-codes';
import { jsonContent } from 'stoker/openapi/helpers';

import { selectUsersSchema } from '@/db/schema';

const tags = ['Users'];

export const list = createRoute({
    tags,
    path: '/users',
    method: 'get',
    responses: {
        [HttpStatusCodes.OK]: jsonContent(
            z.array(selectUsersSchema),
            'The list of videos',
        ),
    },
});

export type ListRoute = typeof list;
