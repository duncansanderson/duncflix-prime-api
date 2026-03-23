import {
    integer,
    json,
    pgEnum,
    pgTable,
    real,
    text,
    timestamp,
    uuid,
    varchar,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { z } from 'zod';
import { users } from './users.ts';
import { createInsertSchema } from 'drizzle-zod';

export const formatEnum = pgEnum('format', ['digital', 'dvd']);
export const typeEnum = pgEnum('type', ['movie', 'series']);

export const titles = pgTable('titles', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
        .references(() => users.id, { onDelete: 'cascade' })
        .notNull(),
    availableSeasons: integer('available_seasons')
        .array()
        .notNull()
        .default(sql`'{}'::integer[]`),
    backdropPath: varchar('backdrop_path', { length: 255 }),
    belongsToCollection: varchar('belongs_to_collection', { length: 255 }),
    episodeRunTime: integer('episode_run_time')
        .array()
        .notNull()
        .default(sql`'{}'::integer[]`),
    firstAirDate: varchar('first_air_date', { length: 10 }),
    format: formatEnum('format')
        .array()
        .notNull(),
    genre: varchar('genre')
        .array()
        .notNull()
        .default(sql`'{}'::varchar[]`),
    images: json('images'),
    lastAirDate: varchar('last_air_date', { length: 10 }),
    name: varchar('name', { length: 255 }).notNull(),
    numberOfEpisodes: integer('number_of_episodes'),
    numberOfSeasons: integer('number_of_seasons'),
    overview: text('overview').notNull(),
    posterPath: varchar('poster_path', { length: 255 }),
    releaseDate: varchar('release_date', { length: 10 }),
    runtime: integer('runtime'),
    tagline: text('tagline'),
    type: typeEnum('type').notNull(),
    voteAverage: real('vote_average'),
    voteCount: real('vote_count'),
    video: json('video'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const titlesInsertSchema = createInsertSchema(titles, {
    userId: (schema) => schema.optional(),
    availableSeasons: z.array(z.number()).min(1),
    backdropPath: (schema) => schema
        .max(255, 'Name must be less than 255 characters'),
    belongsToCollection: (schema) => schema
        .max(255, 'Name must be less than 255 characters'),
    episodeRunTime: z.array(z.number()).min(1),
    firstAirDate: (schema) => schema
        .regex(
            /^(\d{4})-(0[1-9]|1[0-2]|[1-9])-([1-9]|0[1-9]|[1-2]\d|3[0-1])$/,
            'Birthday must be in the format `yyyy-mm-dd`',
        ),
    lastAirDate: (schema) => schema
        .regex(
            /^(\d{4})-(0[1-9]|1[0-2]|[1-9])-([1-9]|0[1-9]|[1-2]\d|3[0-1])$/,
            'Birthday must be in the format `yyyy-mm-dd`',
        ),
    name: (schema) => schema.max(255, 'Name must be less than 255 characters'),
    numberOfEpisodes: (schema) => schema.min(1, 'Must be more than one'),
    posterPath: (schema) => schema
        .max(255, 'Name must be less than 255 characters'),
    releaseDate: (schema) => schema
        .regex(
            /^(\d{4})-(0[1-9]|1[0-2]|[1-9])-([1-9]|0[1-9]|[1-2]\d|3[0-1])$/,
            'Birthday must be in the format `yyyy-mm-dd`',
        ),
    runtime: (schema) => schema.min(1, 'Must be more than one'),
    voteAverage: (schema) => schema.min(1, 'Must be more than one'),
    voteCount: (schema) => schema.min(1, 'Must be more than one'),
});
