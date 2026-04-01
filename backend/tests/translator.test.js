const { translateText } = require('../utils/translator');

describe('Translator Utility', () => {
    test('translates "Penanaman" to "Planting" correctly using dictionary', async () => {
        const result = await translateText('Penanaman');
        expect(result).toBe('Planting');
    });

    test('translates "Pesta" to "Party" dynamically if not in dictionary', async () => {
        // "Pesta" is not in our hardcoded dictionary
        const result = await translateText('Pesta');
        expect(result.toLowerCase()).toBe('party');
    });
});
