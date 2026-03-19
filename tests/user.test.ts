import request from 'supertest';
import { afterEach } from 'vitest';
import app from '../src/server.ts'
import { cleanupDatabase, createTestUser } from './helpers/dbHelpers.ts';
import e from 'express';

describe('User endpoints', () => {
    afterEach(async() => {
        await cleanupDatabase();
    });

    describe('GET /api/users/profile', () => {
        it('should return a logged in user\s profile', async() => {
            const { token, user } = await createTestUser();

            const response = await request(app)
                .get('/api/users/profile')
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('user');
            expect(response.body.user).toHaveProperty('id', user.id );
            expect(response.body.user).not.toHaveProperty('password');
        });
    });

    describe('PUT /api/users/profile', () => {
        it('should update a user', async() => {
            const { token } = await createTestUser();

            const newEmail = `updatedTest-${Date.now()}@example.com`

            const response = await request(app)
                .put('/api/users/profile')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    email: newEmail,
                })

            expect(response.status).toBe(200);
            expect(response.body.user.email).toBe(newEmail);
        });
    });

    describe('POST /api/users/change-password', () => {
        it('should update user password', async() => {
            const { rawPassword, token } = await createTestUser();
            const newPassword = 'newPassword123';

            const response = await request(app)
                .post('/api/users/change-password')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    currentPassword: rawPassword,
                    newPassword,
                })

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message', 'Password changed successfully');
        });
    });
});


// Test get profile.
// Test update profile.
// Test change password.
