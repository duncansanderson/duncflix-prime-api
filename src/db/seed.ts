import { db } from './connection.ts';
import { persons, users } from './schema/index.ts';
import { hashPassword } from '../utils/password.ts';

async function seed() {
    console.log('🌱 Starting database seed...');

    try {
        // Step 1: Clear existing data.
        console.log('Clearing existing data...');
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
