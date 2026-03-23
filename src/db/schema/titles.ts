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
import { users } from './users.ts';

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
    numberOfEpisodes: integer('number_of_episodes'),
    numberOfSeasons: integer('number_of_seasons'),
    overview: text('overview').notNull(),
    posterPath: varchar('poster_path', { length: 255 }),
    releaseDate: varchar('release_date', { length: 10 }),
    runtime: integer('runtime'),
    tagline: text('tagline'),
    title: varchar('title', { length: 255 }).notNull(),
    type: typeEnum('type').notNull(),
    voteAverage: real('vote_average'),
    voteCount: real('vote_count'),
    video: json('video'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
