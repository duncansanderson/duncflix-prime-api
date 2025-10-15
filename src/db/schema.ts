import { text, int, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

export const tasks = sqliteTable('tasks', {
    id: integer({ mode: 'number' })
        .primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    done: integer({ mode: 'boolean' })
        .notNull()
        .default(false),
    createdAt: int()
        .notNull()
        .$default(() => Date.now()),
    updatedAt: int()
        .notNull()
        .$default(() => Date.now())
        .$onUpdate(() => Date.now()),
});
