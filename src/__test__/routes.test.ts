import supertest from 'supertest';

import app from '../server';

// eslint-disable-next-line test/prefer-lowercase-title
describe('GET /', () => {
    it('should send back some data', async () => {
        const res = await supertest(app)
            .get('/');

        expect(res.body.message).toBe('hello');
    });
});
