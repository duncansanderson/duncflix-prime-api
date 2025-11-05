import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const userTable  = pgTable('users_table', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    age: integer('age').notNull(),
    email: text('email').notNull().unique(),
});

export const postTable = pgTable('posts_table', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    content: text('content').notNull(),
    userId: integer('user_id')
        .notNull()
        .references(() => userTable.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
        .notNull()
        .$onUpdate(() => new Date),
});

export type InsertUser = typeof userTable.$inferInsert;
export type SelectUser = typeof userTable.$inferSelect;

export type InsertPost = typeof postTable.$inferInsert;
export type SelectPost = typeof postTable.$inferSelect;
