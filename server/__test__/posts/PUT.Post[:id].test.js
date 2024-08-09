const request = require('supertest');
const app = require('../..');
const { seedData, cleanupData, userToken } = require('../../utils/testing');


beforeEach(async () => await seedData());
afterEach(async () => await cleanupData());

describe('POST /posts', () => {
    describe('Success', () => {
        test('should return 200 status and access token', async () => {
            const { status, body } = await request(app).put('/posts/1')
                .set('Authorization', `Bearer ${userToken}`)
                .send({
                    'title': 'Nea nea',
                    'content': 'ini adalah cerita tentang nea'
                });
            expect(status).toBe(200);
            expect(body).toHaveProperty('message', expect.any(String));
            expect(body.message).toBe('success update Nea nea');
        });
    });

    describe('Fail', () => {
        const testCases = [
            {
                articleId: 1,
                description: 'Unauthenticated',
                token: 'Bearer',
                request: {
                    'title': 'Finding Nemo',
                    'content': "It's about Nemo, Dory, And Me",
                    'imgUrl': 'this is image url',
                    'categoryId': 1
                },
                expectedStatus: 401,
                expectedMessage: 'Error Authentication',
            },
            {
                articleId: 1,
                description: 'Invalid Token',
                token: 'Bearer invalid_token',
                request: {
                    'title': 'saya',
                    'content': "It's about Nemo, Dory, And Me",
                    'imgUrl': 'this is image url',
                    'categoryId': 1
                },
                expectedStatus: 401,
                expectedMessage: 'Error Authentication',
            },
            {
                articleId: 1000,
                description: 'Not Found',
                token: `Bearer ${userToken}`,
                request: {
                    'title': 'saya',
                    'content': "It's about Nemo, Dory, And Me"
                },
                expectedStatus: 404,
                expectedMessage: 'Error not found',
            },
        ];

        testCases.forEach((testCase) => {
            it(testCase.description, async () => {
                const { status, body } = await request(app).put(`/posts/${testCase.articleId}`)
                    .set('Authorization', testCase.token)
                    .send(testCase.request);

                expect(status).toBe(testCase.expectedStatus);
                expect(body).toHaveProperty('message');
                expect(body.message).toStrictEqual(testCase.expectedMessage);
            });
        });
    });
});
