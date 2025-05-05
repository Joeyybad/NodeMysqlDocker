const request = require('supertest');
const app = require('../app');

describe('GET /users', () => {
    it('should return status 200', async () => {
        const res = await request(app).get('/users');
        expect(res.statusCode).toBe(200);
    });
});
