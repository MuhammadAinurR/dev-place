const request = require('supertest');
const app = require('../..');
const { userToken } = require('../../utils/testing');

describe('GET /github-trending', () => {
    describe('Success', () => {
        test('should return 200 status and access token', async () => {
            const { status, body } = await request(app).get('/github-trending')
                .set('Authorization', `Bearer ${userToken}`)
            expect(status).toBe(200);
        });
    });
});
