import { integer, json, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';

export const usersTable  = pgTable('users_table', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    age: integer('age').notNull(),
    email: text('email').notNull().unique(),
});

export const postsTable = pgTable('posts_table', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    content: text('content').notNull(),
    userId: integer('user_id')
        .notNull()
        .references(() => usersTable.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
        .notNull()
        .$onUpdate(() => new Date),
});

export const videosTable = pgTable('videos_table', {
    id: serial('id').primaryKey(),
    userId: integer('user_id')
        .notNull()
        .references(() => usersTable.id, { onDelete: 'cascade' }),
    video: json('video').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
        .notNull()
        .$onUpdate(() => new Date),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export const selectUsersSchema = createSelectSchema(usersTable);

export type InsertPost = typeof postsTable.$inferInsert;
export type SelectPost = typeof postsTable.$inferSelect;

export const selectVideoSchema = createSelectSchema(videosTable);

export type InsertVideo = typeof videosTable.$inferInsert;
export type SelectVideo = typeof videosTable.$inferSelect;
