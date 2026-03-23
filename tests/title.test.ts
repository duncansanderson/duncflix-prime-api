import request from 'supertest';
import { afterEach } from 'vitest';
import app from '../src/server.ts';
import {
    cleanupDatabase,
    createTestPersons,
    createTestTitle,
    createTestUser,
} from './helpers/dbHelpers.ts';

describe('Title endpoints', () => {
    afterEach(() => {
        cleanupDatabase
    });

    describe('POST /api/titles', () => {
        const newTitle = {
            availableSeasons: [1, 2, 5],
            backdropPath: '/path/to/backdrop',
            episodeRunTime: [60],
            firstAirDate: '2024-01-04',
            format: ['digital'],
            genre: ['comedy', 'drama'],
            lastAirDate: '2025-01-12',
            name: 'TV Series Demo',
            numberOfEpisodes: 200,
            numberOfSeasons: 4,
            overview: 'Summary of the series',
            posterPath: '/path/to/poster',
            tagline: 'Series tagline',
            type: 'series',
            voteAverage: 3.2,
            voteCount: 145,
        };

        it('should successfully create a new title', async() => {
            const { token } = await createTestUser();

            const response = await request(app)
                .post('/api/titles')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    ...newTitle,
                });

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('message', 'Title successfully created.');
            expect(response.body).toHaveProperty('title');
            expect(response.body.title.name).toBe(newTitle.name);
        });

        it('should require authentication', async() => {
            const response = await request(app)
                .post('/api/persons')
                .send({
                    ...newTitle,
                });

            expect(response.status).toBe(401);
        });

        it('should validate input data', async() => {
            const { token } = await createTestUser();

            const response = await request(app)
                .post('/api/persons')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    ...newTitle,
                    name: '',
                    firstAirDate: '11 August 1956',
                });

            expect(response.status).toBe(400);
        });
    });

    describe('GET /api/titles', () => {
        it('should return all titles', async() => {
            const { user } = await createTestUser();
            await createTestTitle(user.id);

            const response = await request(app)
                .get('/api/titles')

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body.titles)).toBe(true);
            expect(response.body.titles.length).toBeGreaterThan(0);
        });
    });

    describe('GET /api/titles/movies', () => {
        it('should return all movies', async() => {
            const { user } = await createTestUser();
            await createTestTitle(user.id, {
                type: 'movie'
            });

            const response = await request(app)
                .get('/api/titles/movies')

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body.titles)).toBe(true);
            expect(response.body.titles.length).toBeGreaterThan(0);
            expect(response.body.titles[0].type).toBe('movie');
        });
    });

    describe('GET /api/titles/series', () => {
        it('should return all series', async() => {
            const { user } = await createTestUser();
            await createTestTitle(user.id);

            const response = await request(app)
                .get('/api/titles/series')

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body.titles)).toBe(true);
            expect(response.body.titles.length).toBeGreaterThan(0);
            expect(response.body.titles[0].type).toBe('series');
        });
    });
});
