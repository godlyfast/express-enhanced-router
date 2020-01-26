const main = require(".");

describe('Main module', () => {
    it('Should export function', () => {
        expect(typeof main).toBe('function');
    });
});