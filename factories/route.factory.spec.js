const { RouteFactory } = require('./route.factory');
const ServiceContainer = require('../helpers/service-container.helper');
class ResponseMock {
    constructor(cb) {
        this.response = {
            status: null,
            data: null
        };
        this.cb = cb;
    }
    status(status) {
        this.response.status = status;
        return this;
    }
    json(...args) {
        this.response.data = args[0];
        this.cb(this.response);
        return this;
    }
}

class FooController {
    getFoo() {
        return Promise.resolve({foo: true});
    }
}

describe('Route Factory', () => {
    it('Should work', () => {
        ServiceContainer.registerProvider("FooController", () => new FooController());
        const r = RouteFactory([{name: 'foo', action: 'getFoo', controller: 'FooController'}]);
        expect(r).toBeTruthy();
        expect(r.foo).toBeDefined();
        const responseMock = new ResponseMock((response) => {
            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty('foo');
            expect(response.data.foo).toBe(true);
        });
        r.foo({}, responseMock);
    });
});