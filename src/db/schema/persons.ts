import {
    pgTable,
    text,
    timestamp,
    uuid,
    varchar,
} from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { createInsertSchema } from 'drizzle-zod';
import { users } from '../schema/index.ts';

export const persons = pgTable('persons', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
        .references(() => users.id, { onDelete: 'cascade' })
        .notNull(),
    biography: text('biography'),
    birthday: varchar('birthday', { length: 10 }),
    deathday: varchar('deathday', { length: 10 }),
    imdbId: varchar('imdb_id', { length: 20 }).notNull(),
    name: varchar('name', { length: 255 }).notNull().unique(),
    placeOfBirth: varchar('place_of_birth', { length: 255 }),
    profilePath: varchar('profile_path', { length: 255 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const personsInsertSchema = createInsertSchema(persons, {
    userId: (schema) => schema.optional(),
    birthday: (schema) => schema
        .regex(
            /^(\d{4})-(0[1-9]|1[0-2]|[1-9])-([1-9]|0[1-9]|[1-2]\d|3[0-1])$/,
            'Birthday must be in the format `yyyy-mm-dd`',
        ),
    deathday: (schema) => schema
        .regex(
            /^(\d{4})-(0[1-9]|1[0-2]|[1-9])-([1-9]|0[1-9]|[1-2]\d|3[0-1])$/,
            'Birthday must be in the format `yyyy-mm-dd`',
        ),
    name: (schema) => schema.max(255, 'Name must be less than 255 characters'),
    placeOfBirth: (schema) => schema.max(255, 'Name must be less than 255 characters'),
    profilePath: (schema) => schema.max(255, 'Name must be less than 255 characters'),
});

export type PersonInsert = z.infer<typeof personsInsertSchema>;
