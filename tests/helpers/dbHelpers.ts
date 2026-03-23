import type { TitleFormat, TitleType } from '../../types/index.ts';
import { db } from '../../src/db/connection.ts';
import {
    persons,
    titles,
    users,
} from '../../src/db/schema/index.ts';
import { hashPassword } from '../../src/utils/password.ts';
import { generateToken } from '../../src/utils/jwt.ts';

export async function createTestUser(userData: Partial<{
    email: string;
    username: string;
    password: string;
}> = {}) {
    const defaultData = {
        email: `test-${Date.now()}--${Math.random()}@example.com`,
        username: `testuser-${Date.now()}--${Math.random()}`,
        password: 'TestPassword123!',
        ...userData,
    }

    const hashedPassword = await hashPassword(defaultData.password);
    const [user] = await db
        .insert(users)
        .values({
            ...defaultData,
            password: hashedPassword,
        })
        .returning();

    const token = await generateToken({
        id: user.id,
        email: user.email,
        username: user.username,
    });

    return { user, token, rawPassword: defaultData.password };
}

export async function createTestPersons(userId, personData: Partial<{
    biography: string,
    birthday: string,
    deathday: string,
    imdbId: string,
    name: string,
    placeOfBirth: string,
    profilePath: string
}> = {}) {
    const defaultData = {
        biography: 'Person bio',
        birthday: '2025-04-12',
        deathday: '2026-04-12',
        imdbId: 'nm0000158',
        name: 'Bob McBoberson',
        placeOfBirth: 'Bobville',
        profilePath: '/path/to/profile',
        ...personData,
    };

    const [person] = await db
        .insert(persons)
        .values({
            userId,
            ...defaultData,
        })
        .returning();

    return person;
}

export async function createTestTitle(userId, titleData: Partial<{
    availableSeasons: number[],
    backdropPath: string,
    episodeRunTime: number[],
    format: TitleFormat[];
    genre: string[];
    lastAirDate: string;
    name: string;
    numberOfEpisodes: number;
    numberOfSeasons: number;
    overview: string;
    posterPath: string;
    tagline: string;
    type: TitleType;
    voteAverage: number;
    voteCount: number;
}> = {}) {
    const defaultData = {
        availableSeasons: [1, 2, 5],
        backdropPath: '/path/to/backdrop',
        episodeRunTime: [60],
        firstAirDate: '2024-01-04',
        format: ['digital', 'dvd'] as TitleFormat[],
        genre: ['comedy', 'drama'],
        lastAirDate: '2025-01-12',
        name: 'TV Series Demo',
        numberOfEpisodes: 200,
        numberOfSeasons: 4,
        overview: 'Summary of the series',
        posterPath: '/path/to/poster',
        tagline: 'Series tagline',
        type: 'series' as TitleType,
        voteAverage: 3.2,
        voteCount: 145,
        ...titleData,
    };

    const [title] = await db
        .insert(titles)
        .values({
            userId,
            ...defaultData,
        })
        .returning();

    return title;
}

export async function cleanupDatabase() {
    await db.delete(users);
}
