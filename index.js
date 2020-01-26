const { ControllerRegistrar } = require("./helpers/controller-registrar.helper");
const ServiceContainer = require('./helpers/service-container.helper');
module.exports = (router, subdir) => {
  var infrastructureRootPath = "../..";
  if (subdir) {
    const securedSubdirArr = subdir.split('/').filter(n => n !== '');
    infrastructureRootPath += "/" + securedSubdirArr.join('/') + '/';
    const def = '../../../';
    ServiceContainer.setRootLevel(def + '/' + securedSubdirArr.join('/') + '/');
  }
  return ControllerRegistrar(
    router,
    `${infrastructureRootPath}/infrastructure/controllers`
  );
};