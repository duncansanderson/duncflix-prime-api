import type { AppRouteHandler } from '@/lib/types';

import db from '@/db';
import { usersTable } from '@/db/schema';

import type { ListRoute } from './users.routes';

export async function list() {
    const result = await db.select().from(usersTable);
    return result;
}
// export async function list(c): AppRouteHandler<ListRoute> {
//     const users = db.select().from(usersTable);
//     return c.json(users);
// }

// export const list: AppRouteHandler<ListRoute> = async (c) => {
//     const tasks = db.select().from(usersTable);
//     return c.json(tasks);
// };

