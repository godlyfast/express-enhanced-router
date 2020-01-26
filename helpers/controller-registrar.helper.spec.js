const {ControllerRegistrar} = require('./controller-registrar.helper');
const ServiceContainer = require('./service-container.helper');
ServiceContainer.setRootLevel('../tests/');

describe('ControllerRegistrar Helper', () => {
    it('Should Work', () => {
        const router = {
            get: jest.fn()
        };
        ControllerRegistrar(router, './tests/infrastructure/controllers');
        expect(router.get).toHaveBeenCalled();
    });
});