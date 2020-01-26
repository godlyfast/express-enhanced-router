const { ControllerRegistrar } = require("./helpers/controller-registrar.helper");
module.exports = (router, infrastructureRootPath = "../..") => {
  return ControllerRegistrar(
    router,
    `${infrastructureRootPath}/infrastructure/controllers`
  );
};