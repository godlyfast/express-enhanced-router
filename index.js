const {ControllerRegistrator} = require("./helpers/controller-registrator.helper");
module.exports = (router) => {
    return ControllerRegistrator(router, "../../infrastructure/controllers");
}