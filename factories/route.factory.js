"use strict";

const RouteFactory = routes => {
  var module = {};
  routes.forEach(routeObject => {
    if (!routeObject.name)
      throw new Error("Route Object should contain name property");
    if (!routeObject.action)
      throw new Error("Route Object should contain action property");
    if (!routeObject.controller)
      throw new Error("Route Object should contain controller name");

    const controller = require("../helpers/service-container.helper").get(
      routeObject.controller
    );

    if (!controller[routeObject.action])
      throw new Error(
        "Controller should contain action specified in route object"
      );
    if (typeof controller[routeObject.action] !== "function")
      throw new Error("Controller action should be function");

    module[routeObject.name] = (...args) => {
      controller[routeObject.action](...args)
        .then(results =>
          typeof controller.sendJson === "function"
            ? controller.sendJson(results, ...args)
            : args[1].status(200).json(results)
        )
        .catch(err =>
          typeof controller.sendError === "function"
            ? controller.sendError(err, ...args)
            : args[1].status(err.status || 500).json(err)
        );
    };
  });
  return module;
};

module.exports = {
  RouteFactory
};
