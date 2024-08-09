const request = require('supertest');
const app = require('../..');
const { seedData, cleanupData, userToken } = require('../../utils/testing');


beforeAll(async () => await seedData());
afterAll(async () => await cleanupData());

describe('POST /posts', () => {
    describe('Success', () => {
        test('should return 200 status and access token', async () => {
            const { status, body } = await request(app).post('/posts')
                .set('Authorization', `Bearer ${userToken}`)
                .send({
                    'title': 'Finding Nemo',
                    'content': "It's about Nemo, Dory, And Me",
                    'imgUrl': 'this is image url',
                    "categoryIds": [2]
                });
            expect(status).toBe(201);
            expect(body).toHaveProperty('message', expect.any(String));
            expect(body.message).toBe('Post created successfully');
        });
    });

    describe('Fail', () => {
        const testCases = [
            {
                description: 'Unauthenticated',
                token: '',
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
                description: 'Invalid Token',
                token: 'Bearer invalid_token',
                request: {
                    'title': 'Finding Nemo',
                    'content': "It's about Nemo, Dory, And Me",
                    'imgUrl': 'this is image url',
                    'categoryId': 1
                },
                expectedStatus: 401,
                expectedMessage: 'Error Authentication',
            },
        ];

        testCases.forEach((testCase) => {
            it(testCase.description, async () => {
                const { status, body } = await request(app).post('/posts')
                    .set('Authorization', testCase.token)
                    .send(testCase.request);

                expect(status).toBe(testCase.expectedStatus);
                expect(body).toHaveProperty('message');
                expect(body.message).toStrictEqual(testCase.expectedMessage);
            });
        });
    });
});
