const stringHelper = require('./string.helper');

describe('String Helper', () => {
    it('Should Work', () => {
        expect(stringHelper.toPascal('foo-bar')).toBe('FooBar');
        expect(stringHelper.toPascal('foo bar')).toBe('FooBar');
        expect(stringHelper.toPascal('-foo-bar')).toBe('FooBar');
        expect(stringHelper.toPascal('Foo Bar')).toBe('FooBar');
    });
});