import {
    pgTable,
    timestamp,
    uuid,
    varchar,
} from 'drizzle-orm/pg-core';
import { createUpdateSchema } from 'drizzle-zod';
import { z } from 'zod';

// Users table - core authentication and profile.
export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    username: varchar('username', { length: 50 }).notNull().unique(),
    password: varchar('password', { length: 255 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const usersUpdateSchema = createUpdateSchema(users, {
    email: z.email('Invalid email format').optional(),
    username: (schema) => schema
        .min(3, 'Username must be at least 3 characters.')
        .max(50, 'Username too long.')
        .optional(),
});

export const usersChangePasswordSchema = z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            'Password must contain uppercase, lowercase, and number'
        ),
});
