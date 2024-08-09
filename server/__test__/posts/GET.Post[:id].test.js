const request = require('supertest');
const app = require('../..');
const { seedData, cleanupData, userToken } = require('../../utils/testing');


beforeAll(async () => {
    await seedData();
});
afterAll(async () => await cleanupData());

describe.only('GET /posts/:id', () => {
    describe('Success', () => {
        test('should return 200 status and get the articles', async () => {
            const { status, body } = await request(app).get('/posts/1')
                .set('Authorization', `Bearer ${userToken}`);

            expect(status).toBe(200);
            expect(body).toHaveProperty('id', expect.any(Number));
            expect(body).toHaveProperty('title', expect.any(String));
            expect(body.title).toBe('Exploring Express and Sequelize');
            expect(body).toHaveProperty('imgUrl', expect.any(String));
            expect(body).toHaveProperty('content', expect.any(String));
            expect(body.content).toBe("This post explains how to integrate Express with Sequelize.");
            expect(body).toHaveProperty('userId', expect.any(Number));
        })
    })

    describe('Fail', () => {
        test('Not Login', async () => {
            const { status, body } = await request(app).get('/posts/1')

            expect(status).toBe(401);
            expect(body).toHaveProperty('message', expect.any(String));
            expect(body.message).toBe('Error Authentication');
        })
        test('Invalid Token', async () => {
            const { status, body } = await request(app).get('/posts/1')
                .set('Authorization', `Bearer InvalidToken`);

            expect(status).toBe(401);
            expect(body).toHaveProperty('message', expect.any(String));
            expect(body.message).toBe('Error Authentication');
        })
        test('Invalid Token', async () => {
            const { status, body } = await request(app).get('/posts/99999')
                .set('Authorization', `Bearer ${userToken}`);
            expect(status).toBe(404);
            expect(body).toHaveProperty('message', expect.any(String));
            expect(body.message).toBe('Error not found');
        })
    })
})