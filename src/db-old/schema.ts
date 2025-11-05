import { int, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

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

export const selectTasksSchema = createSelectSchema(tasks);

export const insertTasksSchema = createInsertSchema(tasks, {
    name: field => field.min(1).max(500),
})
    .required({
        done: true,
    })
    .omit({
        id: true,
        createdAt: true,
        updatedAt: true,
    });

export const patchTasksSchema = insertTasksSchema.partial();
