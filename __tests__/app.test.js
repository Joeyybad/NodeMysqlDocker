const request = require('supertest');
const app = require('../app');
const db = require('../db');
let server;

beforeAll((done) => {
    server = app.listen(3001, () => {
        console.log("Test server running on port 3001");
        done();
    });
});

afterAll(async () => {
    await db.close();
    server.close();
});

describe('GET /users', () => {
    it('should return status 200', async () => {
        const res = await request(server).get('/users');
        expect(res.statusCode).toBe(200);
        expect(res.text).toContain("Alice");
    });
});

describe('POST /users', () => {
    it('should insert a new user and return 302 (redirect)', async () => {
        const res = await request(app)
            .post('/users')
            .send('name=TestUser')
            .set('Content-Type', 'application/x-www-form-urlencoded');

        expect(res.statusCode).toBe(302); // car on fait un redirect après ajout
        expect(res.header['location']).toBe('/users');

        // Vérifie que l'utilisateur a bien été inséré
        const [rows] = await db.query('SELECT * FROM users WHERE name = ?', ['TestUser']);
        expect(rows.length).toBeGreaterThan(0);
        expect(rows[0].name).toBe('TestUser');
    });
});