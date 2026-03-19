import request from 'supertest';
import { afterEach } from 'vitest';
import app from '../src/server.ts'
import {
    cleanupDatabase,
    createTestPersons,
    createTestUser,
} from './helpers/dbHelpers.ts';

describe('Person endpoints', () => {
    afterEach(() => {
        cleanupDatabase();
    });

    describe('POST /api/persons', () => {
        const newPerson = {
            biography: 'Person bio',
            birthday: '2025-04-12',
            deathday: '2026-04-12',
            imdbId: 'nm0000158',
            name: 'Tim McTmerson',
            placeOfBirth: 'Bobville',
            profilePath: '/path/to/profile'
        };

        it('should create a new person', async() => {
            const { token } = await createTestUser();

            const response = await request(app)
                .post('/api/persons')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    ...newPerson,
                });

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('message', 'Person created successfully');
            expect(response.body).toHaveProperty('person');
            expect(response.body.person.name).toBe(newPerson.name);
        });

        it('should require authentication', async() => {
            const response = await request(app)
                .post('/api/persons')
                .send({
                    ...newPerson,
                });

            expect(response.status).toBe(401);
        });

        it('should validate input data', async() => {
            const { token } = await createTestUser();

            const response = await request(app)
                .post('/api/persons')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    ...newPerson,
                    name: '',
                    birthday: '11 August 1956',
                });

            expect(response.status).toBe(400);
        });
    });

    describe('GET /api/persons', () => {
        it('should return all persons', async() => {
            const { user } = await createTestUser();
            await createTestPersons(user.id);

            const response = await request(app)
                .get('/api/persons')

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body.persons)).toBe(true);
            expect(response.body.persons.length).toBeGreaterThan(0);
        });
    });
})
