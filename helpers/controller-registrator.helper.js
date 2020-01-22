const fs = require("fs");
const path = require("path");
const { RouteFactory } = require("../factories/route.factory");
const { capitalize, toKebab } = require("./string.helper");

module.exports = {
  ControllerRegistrator: (router, controllerPath) => {
    var normalizedPath = path.join(__dirname, "../" + controllerPath);

    fs.readdirSync(normalizedPath).forEach(function(file) {
      const modulePath = path.normalize("../" + controllerPath + "/" + file);
      const module = require(modulePath);
      const ctrlName = capitalize(file.split(".")[0]) + "Controller";
      const ctrl = module[ctrlName];
      if (!ctrl)
        throw new Error(`Controller file ${file} should export ${ctrlName}`);
      if (typeof ctrl.$actions === "function") {
        const actions = ctrl.$actions().map(a =>
          typeof a === "string"
            ? {
                action: a
              }
            : { ...a }
        );

        const routes = RouteFactory(
          actions.map(action => ({
            name: action.action,
            action: action.action,
            controller: ctrlName
          }))
        );
        actions.forEach(action => {
          const kebabbedAction = toKebab(action.action);
          const actionSplitted = kebabbedAction.split("-");
          var method;
          var path = "/";
          if (
            "get|post|put|delete|options|patch".indexOf(actionSplitted[0]) !==
            -1
          ) {
            method = actionSplitted[0];
            actionSplitted.shift();
          }
          let rejoinedPathFromAction;
          if (action.path) {
            rejoinedPathFromAction = action.path
              .split("/")
              .filter(p => p !== "")
              .join("/");
          }
          path += rejoinedPathFromAction
            ? rejoinedPathFromAction
            : method
            ? file.split(".")[0] + "/" + actionSplitted.join("-")
            : file.split(".")[0] + "/" + kebabbedAction;
          const params = [path];
          if (action.middlewares) {
            params.push(...action.middlewares.map(m => m()));
          }
          method =
            (action.method ? action.method.toLowerCase() : false) ||
            method.toLowerCase();
          router[method](...params, routes[action.action]);
          console.log(
            `REGISTERED ${method.toUpperCase()} ${path} to ${ctrlName}.${
              action.action
            }`
          );
        });
      }
    });

    return router;
  }
};
