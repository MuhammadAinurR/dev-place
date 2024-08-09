const request = require('supertest');
const app = require('../..');
const { seedData, cleanupData, userToken } = require('../../utils/testing');


beforeAll(async () => {
    await seedData();
});
afterAll(async () => await cleanupData());

describe.only('GET /articles', () => {
    describe('Success', () => {
        test('should return 200 status and get the posts', async () => {
            const { status, body } = await request(app).get('/posts')
                .set('Authorization', `Bearer ${userToken}`);

            expect(status).toBe(200);
            expect(body[0]).toHaveProperty('id', expect.any(Number));
            expect(body[0]).toHaveProperty('title', expect.any(String));
            expect(body[0].title).toBe('Exploring Express and Sequelize');
            expect(body[0]).toHaveProperty('imgUrl', expect.any(String));
            expect(body[0]).toHaveProperty('content', expect.any(String));
            expect(body[0].content).toBe("This post explains how to integrate Express with Sequelize.");
            expect(body[0]).toHaveProperty('userId', expect.any(Number));
        })
    })

    describe('Fail', () => {
        test('Not Login', async () => {
            const { status, body } = await request(app).get('/posts')

            expect(status).toBe(401);
            expect(body).toHaveProperty('message', expect.any(String));
            expect(body.message).toBe('Error Authentication');
        })
        test('Invalid Token', async () => {
            const { status, body } = await request(app).get('/posts')
                .set('Authorization', `Bearer InvalidToken`);
            expect(status).toBe(401);
            expect(body).toHaveProperty('message', expect.any(String));
            expect(body.message).toBe('Error Authentication');
        })
    })
})