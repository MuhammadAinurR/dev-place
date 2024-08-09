const request = require('supertest');
const app = require('../..');
const { seedData, cleanupData, userToken, userAccount } = require('../../utils/testing');

beforeAll(async () => await seedData());
afterAll(async () => await cleanupData());

describe('POST /users/login', () => {
    describe('Success', () => {
        test('should return 200 status and access token', async () => {
            const { status, body } = await request(app).post('/users/login').send({ email: userAccount.email, password: userAccount.password });
            expect(status).toBe(200);
            expect(body).toHaveProperty('access_token', expect.any(String));
        });
    });

    describe('Fail', () => {
        const testCases = [
            {
                description: 'Empty Email',
                request: { email: '', password: userAccount.password },
                expectedStatus: 400,
                expectedMessage: 'Email is required',
            },
            {
                description: 'Empty password',
                request: { email: userAccount.email, password: '' },
                expectedStatus: 400,
                expectedMessage: 'Password is required',
            },
            {
                description: 'Invalid Email',
                request: { email: 'invalid@gmail.com', password: userAccount.password },
                expectedStatus: 401,
                expectedMessage: 'Invalid email or password',
            },
            {
                description: 'Invalid Password',
                request: { email: userAccount.email, password: 'invalidPassword' },
                expectedStatus: 401,
                expectedMessage: 'Invalid email or password',
            },
        ];

        testCases.forEach((testCase) => {
            it(testCase.description, async () => {
                const { status, body } = await request(app).post('/users/login').send(testCase.request);
                expect(status).toBe(testCase.expectedStatus);
                expect(body).toHaveProperty('message');
                expect(body.message).toBe(testCase.expectedMessage);
            });
        });
    });
});
