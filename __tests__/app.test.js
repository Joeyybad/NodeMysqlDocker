const request = require('supertest');
const app = require('../app');

let server;

beforeAll((done) => {
    server = app.listen(3001, () => {
        console.log("Test server running on port 3001");
        done();
    });
});

afterAll((done) => {
    server.close(done);
});

describe('GET /users', () => {
    it('should return status 200', async () => {
        const res = await request(server).get('/users');
        expect(res.statusCode).toBe(200);
        expect(res.text).toContain("Alice");
    });
});
