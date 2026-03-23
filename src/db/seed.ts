import { db } from './connection.ts';
import { persons, titles, users } from './schema/index.ts';
import { hashPassword } from '../utils/password.ts';

async function seed() {
    console.log('🌱 Starting database seed...');

    try {
        // Step 1: Clear existing data.
        console.log('Clearing existing data...');
        await db.delete(titles);
        await db.delete(persons);
        await db.delete(users);

        // Step 2: Create foundation data.
        console.log('Creating demo users...');
        const rawPassword = 'demo123';
        const hashedPassword = await hashPassword(rawPassword);

        const [demoUser] = await db
            .insert(users)
            .values({
                email: 'demo@example.com',
                username: 'demouser',
                password: hashedPassword,
            })
            .returning()

        console.log('Creating demo person...');
        const [demoPerson] = await db
            .insert(persons)
            .values({
                userId: demoUser.id,
                biography: 'demo bio',
                birthday: '2025-04-12',
                deathday: '2026-04-12',
                imdbId: 'demoId',
                name: 'Bob McBoberson',
                placeOfBirth: 'demoland',
                profilePath: 'path/to/profile.jpg',
            })
            .returning();

        console.log('Creating demo movie title...');
        const [demoMovieTitle] = await db
            .insert(titles)
            .values({
                userId: demoUser.id,
                backdropPath: '/path/to/backdrop',
                format: ['digital'],
                genre: ['horror', 'crime'],
                overview: 'Something about the plot of the movie',
                posterPath: '/path/to/poster',
                releaseDate: '2025-02-01',
                runtime: 123,
                tagline: 'Movie tagline',
                title: 'Movie title',
                type: 'movie',
                voteAverage: 4.3,
                voteCount: 12,
            })
            .returning();

        console.log('Creating demo series title...');
        const [demoSeriesTitle] = await db
            .insert(titles)
            .values({
                userId: demoUser.id,
                availableSeasons: [1, 2, 5],
                backdropPath: '/path/to/backdrop',
                episodeRunTime: [60],
                firstAirDate: '2024-01-04',
                format: ['digital', 'dvd'],
                genre: ['comedy', 'drama'],
                lastAirDate: '2025-01-12',
                numberOfEpisodes: 200,
                numberOfSeasons: 4,
                overview: 'Summary of the series',
                posterPath: '/path/to/poster',
                tagline: 'Series tagline',
                title: 'TV Series',
                type: 'series',
                voteAverage: 3.2,
                voteCount: 145,
            })
            .returning();

        console.log('✅ Database successfully seeded!');
        console.log('\n 📊 Seed summary:');
        console.log('\n 🔐 Login details:');
        console.log(`Email: ${demoUser.email}`);
        console.log(`Password: ${rawPassword}`);
    } catch (error) {
        console.error('❌ Seed failed:', error);
        throw error;
    }
}

if (import.meta.url === `file://${process.argv[1]}`) {
    seed()
        .then(() => process.exit(0))
        .catch((error) => {
            console.error(error);
            process.exit(1);
        });
}

export default seed;
