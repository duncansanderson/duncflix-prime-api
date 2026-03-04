import { db } from './connection.ts';
import { users } from './schema.ts';
import { hashPassword } from '../utils/password.ts';

async function seed() {
    console.log('🌱 Starting database seed...');

    try {
        // Step 1: Clear existing data.
        console.log('Clearing existing data...');
        await db.delete(users);

        // Step 2: Create foundation data.
        console.log('Creating demo users...');
        const hashedPassword = await hashPassword('demo123');

        const [demoUser] = await db
            .insert(users)
            .values({
                email: 'demo@example.com',
                username: 'demouser',
                password: hashedPassword,
            })
            .returning()

        console.log('✅ Database successfully seeded!');
        console.log('\n 📊 Seed summary:');
        console.log('\n 🔐 Login details:');
        console.log('Email: demo@example.com');
        console.log('Password: demo123');
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
