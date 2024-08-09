const request = require('supertest');
const app = require('../..');
const { seedData, cleanupData, userToken } = require('../../utils/testing');

beforeEach(async () => await seedData());
afterEach(async () => await cleanupData());

describe('POST /users/register', () => {
    const newUserUsername = 'New Nea'
    const newUserEmail = 'newMail@mail.com';
    const newUserPassword = 'nea1234';
    describe('Success', () => {
        test('should return 200 status and success create user account', async () => {
            const { status, body } = await request(app).post('/users/register')
                .send({
                    "username": newUserUsername,
                    "email": newUserEmail,
                    "password": newUserPassword
                });

            expect(status).toBe(201);
            expect(body).toHaveProperty('message', expect.any(String));
            expect(body.message).toBe('success create account');
        });
    });

    describe('Fail', () => {
        test('No email input', async () => {
            const { status, body } = await request(app).post('/users/register')
                .send({
                    "username": newUserUsername,
                    "password": newUserPassword
                });

            expect(status).toBe(400);
            expect(body).toHaveProperty('message', expect.any(Object));
            expect(body.message).toStrictEqual(['Email should not empty'])
        });

        test('No password input', async () => {
            const { status, body } = await request(app).post('/users/register')
                .send({
                    "username": newUserUsername,
                    "email": newUserEmail,
                });

            expect(status).toBe(400);
            expect(body).toHaveProperty('message', expect.any(Object));
            expect(body.message).toStrictEqual(['Password should not empty'])
        });

        test('Empty string email input', async () => {
            const { status, body } = await request(app).post('/users/register')
                .send({
                    "username": newUserUsername,
                    'email': '',
                    "password": newUserPassword
                });

            expect(status).toBe(400);
            expect(body).toHaveProperty('message', expect.any(Object));
            expect(body.message).toStrictEqual(['Email should not empty', 'Invalid email format'])
        });
        test('Password string email input', async () => {
            const { status, body } = await request(app).post('/users/register')
                .send({
                    "username": newUserUsername,
                    'email': newUserEmail,
                    "password": ''
                });

            expect(status).toBe(400);
            expect(body).toHaveProperty('message', expect.any(Object));
            expect(body.message).toStrictEqual(['Password should not empty', 'Password length should more than 5'])
        });

        test('Username already registered', async () => {
            await request(app).post('/users/register')
                .send({
                    "username": newUserUsername,
                    'email': newUserEmail,
                    "password": newUserPassword
                });

            const { status, body } = await request(app).post('/users/register')
                .send({
                    "username": newUserUsername,
                    'email': newUserEmail,
                    "password": newUserPassword
                });

            expect(status).toBe(400);
            expect(body).toHaveProperty('message', expect.any(Object));
            expect(body.message).toStrictEqual(['Username has been registered'])
        });
        test('Email already registered', async () => {
            await request(app).post('/users/register')
                .send({
                    "username": newUserUsername,
                    'email': newUserEmail,
                    "password": newUserPassword
                });

            const { status, body } = await request(app).post('/users/register')
                .send({
                    "username": 'hehe',
                    'email': newUserEmail,
                    "password": newUserPassword
                });

            expect(status).toBe(400);
            expect(body).toHaveProperty('message', expect.any(Object));
            expect(body.message).toStrictEqual(['Email has been registered'])
        });

        test('Invalid email format', async () => {
            const { status, body } = await request(app).post('/users/register')
                .send({
                    "username": newUserUsername,
                    'email': 'babayagaaa',
                    "password": newUserPassword
                });

            expect(status).toBe(400);
            expect(body).toHaveProperty('message', expect.any(Object));
            expect(body.message).toStrictEqual(['Invalid email format'])
        });
    });
});
