const { RouteFactory } = require('./route.factory');
const ServiceContainer = require('../helpers/service-container.helper')
describe('Route Factory', () => {
    it('Should work', () => {
        ServiceContainer.registerProvider("FooController", () => ({
            getFoo: () => {}
        }));
        const r = RouteFactory([{name: 'foo', action: 'getFoo', controller: 'FooController'}]);
        expect(r).toBeTruthy();
    });
});