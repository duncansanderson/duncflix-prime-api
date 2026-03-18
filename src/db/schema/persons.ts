import {
    pgTable,
    text,
    timestamp,
    uuid,
    varchar,
} from 'drizzle-orm/pg-core';

import { users } from '../schema/index.ts';

export const persons = pgTable('persons', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
        .references(() => users.id, { onDelete: 'cascade' })
        .notNull(),
    biography: text('biography').notNull(),
    birthday: varchar('birthday', { length: 10 }),
    deathday: varchar('deathday', { length: 10 }),
    imdbId: varchar('imdb_id', { length: 20 }).notNull(),
    name: varchar('name', { length: 255 }).notNull().unique(),
    placeOfBirth: varchar('place_of_birth', { length: 255 }),
    profilePath: varchar('profile_path', { length: 255 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
