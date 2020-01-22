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
        .then(results => controller.sendJson(results, ...args))
        .catch(err => controller.sendError(err, ...args));
    };
  });
  return module;
};

module.exports = {
  RouteFactory
};
