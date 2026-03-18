import { sql } from 'drizzle-orm';
import { execSync } from 'child_process';
import { db } from '../../src/db/connection.ts';
import { users } from '../../src/db/schema/index.ts';
import env from '../../src/env.ts';

export default async function setup() {
    console.log('Setting up test database...');

    try {
        // Drop all tables.
        await db.execute(sql`DROP TABLE IF EXISTS ${users} CASCADE`);

        console.log('Pushing schema using drizzle-kit...');

        execSync(
            `npx drizzle-kit push --url="${env.DATABASE_URL}" --schema="./src/db/schema/index.ts" --dialect="postgresql"`,
            {
                stdio: 'inherit',
                cwd: process.cwd(),
            }
        );

        console.log('Test database setup complete');
    } catch (error) {
        console.error('Failed to setup test database:', error);
        throw error;
    }

    return async() => {
        console.log('Tearing down test database...');

        try {
            await db.execute(sql`DROP TABLE IF EXISTS ${users} CASCADE`);

            console.log('Test database teardown complete');
            process.exit(0);
        } catch (error) {
            console.error('Failed to teardown test database:', error);
        }
    }
}
