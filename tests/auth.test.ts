import request from 'supertest';
import { afterEach } from 'vitest';
import app from '../src/server.ts';
import env from '../src/env.ts';
import { createTestUser, cleanupDatabase } from './helpers/dbHelpers.ts';

const userData = {
    email: `test-${Date.now()}@example.com`,
    username: `testuser-${Date.now()}`,
    password: 'TestPassword123!',
};

describe('Authentication endpoints', () => {
    afterEach(async () => {
        await cleanupDatabase();
    });

    describe('POST /api/auth/register', () => {
        it('should register a new user with valid data', async () => {
            const response = await request(app)
                .post('/api/auth/register')
                .send(userData)
                .expect(201);

            expect(response.body).toHaveProperty(
                'message',
                'User created successfully'
            );

            expect(response.body).toHaveProperty('user');
            expect(response.body).toHaveProperty('token');
            expect(response.body.user).not.toHaveProperty('password');
        });

        it('should return 400 for invalid email', async() => {
            const response = await request(app)
                .post('/api/auth/register')
                .send({
                    ...userData,
                    email: 'invalid email',
                })
                .expect(400);

            expect(response.body).toHaveProperty('error', 'Validation failed');
        });

        it('should return 400 for a short password', async() => {
            const response = await request(app)
                .post('/api/auth/register')
                .send({
                    ...userData,
                    password: 'short',
                })
                .expect(400);

            expect(response.body).toHaveProperty('error', 'Validation failed');
        });
    });

    describe('POST /api/auth/login', () => {
        it('should login with valid credentials', async() => {
            const { user, rawPassword } = await createTestUser({
                email: userData.email,
                password: userData.password,
            });

            const credentials = {
                email: user.email,
                password: rawPassword,
            };

            const response = await request(app)
                .post('/api/auth/login')
                .send(credentials)
                .expect(200);

            expect(response.body).toHaveProperty('message', 'Login successful');
            expect(response.body).toHaveProperty('user');
            expect(response.body).toHaveProperty('token');
            expect(response.body.user).not.toHaveProperty('password');
        });

        it('should return 400 for missing email', async() => {
            const credentials = {
                password: userData.password,
            };

            const response = await request(app)
                .post('/api/auth/login')
                .send(credentials)
                .expect(400);

            expect(response.body).toHaveProperty('error', 'Validation failed');
        });

        it('should return 401 for invalid credentials', async() => {
            const { user } = await createTestUser({
                email: userData.email,
                password: userData.password,
            });

            const credentials = {
                email: user.email,
                password: 'wrong password',
            };

            const response = await request(app)
                .post('/api/auth/login')
                .send(credentials)
                .expect(401);

            expect(response.body).toHaveProperty('error');
        });
    });
});
