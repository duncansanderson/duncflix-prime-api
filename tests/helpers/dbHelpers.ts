import { db } from '../../src/db/connection.ts';
import { users } from '../../src/db/schema/index.ts';
import { persons } from '../../src/db/schema/index.ts';
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

export async function cleanupDatabase() {
    await db.delete(users);
}
