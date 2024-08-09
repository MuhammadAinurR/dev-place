const request = require('supertest');
const app = require('../..');
const { userToken } = require('../../utils/testing');

describe('POST /gemini/guide', () => {
    describe('Success', () => {
        test('should return 200 status and access token', async () => {
            const { status, body } = await request(app).post('/gemini/guide')
                .set('Authorization', `Bearer ${userToken}`)
                .send({
                    "input": "simple express project. no more than 100 char"
                  });
            expect(status).toBe(200);
        });
    });
});
describe('POST /gemini/component-generator', () => {
    describe('Success', () => {
        test('should return 200 status and access token', async () => {
            const { status, body } = await request(app).post('/gemini/component-generator')
                .set('Authorization', `Bearer ${userToken}`)
                .send({
                    "input": "simple card"
                  });
            expect(status).toBe(200);
        });
    });
});
describe('POST /gemini/code-converter', () => {
    describe('Success', () => {
        test('should return 200 status and access token', async () => {
            const { status, body } = await request(app).post('/gemini/code-converter')
                .set('Authorization', `Bearer ${userToken}`)
                .send({
                    "before": "python",
                    "after": "go",
                    "input": "print('hello world')"
                  });
            expect(status).toBe(200);
        });
    });
});
describe('POST /gemini/code-solver', () => {
    describe('Success', () => {
        test('should return 200 status and access token', async () => {
            const { status, body } = await request(app).post('/gemini/code-solver')
                .set('Authorization', `Bearer ${userToken}`)
                .send({
                    "input": "print('hello world)",
                    "errorMessage": "syntax error"
                  });
            expect(status).toBe(200);
        });
    });
});
