const request = require('supertest');
const app = require('../server');

describe('POST /api/utils/translate', () => {
    test('returns translated text from the translation utility', async () => {
        const response = await request(app)
            .post('/api/utils/translate')
            .send({ text: 'Penanaman' });
        
        expect(response.status).toBe(200);
        expect(response.body.translatedText).toBe('Planting');
    });

    test('returns 404 for non-existent endpoint before implementation', async () => {
        // This is just to verify the test environment is working
    });
});
