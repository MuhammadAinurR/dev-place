const request = require('supertest');
const app = require('../..');
const { seedData, cleanupData, userToken } = require('../../utils/testing');

beforeEach(async () => await seedData());
afterEach(async () => await cleanupData());

describe('POST /posts', () => {
    describe('Success', () => {
        test('should return 200 status and access token', async () => {
            const { status, body } = await request(app).delete('/posts/1')
                .set('Authorization', `Bearer ${userToken}`)
            console.log({status, body})
            expect(status).toBe(200);
            expect(body).toHaveProperty('message', expect.any(String));
            expect(body.message).toBe('Exploring Express and Sequelize success to delete');
        });
    });

    describe('Fail', () => {
        const testCases = [
            {
                articleId: 1,
                description: 'Unauthenticated',
                token: '',
                expectedStatus: 401,
                expectedMessage: 'Error Authentication',
            },
            {
                articleId: 1,
                description: 'Invalid Token',
                token: 'Bearer invalid_token',
                expectedStatus: 401,
                expectedMessage: 'Error Authentication',
            },
            {
                articleId: 1000,
                description: 'Not Found',
                token: `Bearer ${userToken}`,
                expectedStatus: 404,
                expectedMessage: 'Error not found',
            },
        ];

        testCases.forEach((testCase) => {
            it(testCase.description, async () => {
                const { status, body } = await request(app).delete(`/posts/${testCase.articleId}`)
                    .set('Authorization', testCase.token)

                expect(status).toBe(testCase.expectedStatus);
                expect(body).toHaveProperty('message');
                expect(body.message).toStrictEqual(testCase.expectedMessage);
            });
        });
    });
});
