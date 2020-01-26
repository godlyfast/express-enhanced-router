var pluralize = require("pluralize");
const { toKebab, toPascal } = require("./string.helper");

const ROOT_LEVEL = '../../../';
const providers = {};
class ServiceContainer {

  constructor(rootLevel) {
    this.rootLevel = rootLevel;
  }

  registerProvider(name, provider) {
    providers[name] = provider;
  }

  setRootLevel(rootLevel) {
    this.rootLevel = rootLevel;
  }

  _createEntity(entity, serviceName) {
    const module = require(this.rootLevel + "infrastructure/" +
      pluralize(entity) +
      "/" +
      toKebab(serviceName).split("-")[0] +
      "." +
      entity);
    const service = module[serviceName];
    
    let injects = service.$inject ?
       service.$inject().map(serviceName => ({
         name: serviceName,
         instance: this.get(serviceName)
        })) : null;
    
    const instance = injects
      ? new service(...injects.map(o => o.instance))
      : new service();
    
    for (const i in injects) {
      console.log(i);
      instance[i.name] = i.instance;
    }

    return instance;  
  }
  get(serviceName) {
    if (providers[serviceName]) return providers[serviceName]();
    let providerFile;
    try {
      providerFile = require(this.rootLevel + "infrastructure/providers/" +
        serviceName +
        ".provider");
    } catch (e) {}
    if (providerFile) {
      providers[serviceName] = providerFile[toPascal(serviceName) + "Provider"];
      return providers[serviceName]();
    }
    switch (toKebab(serviceName).split("-")[1]) {
      case "service":
        return this._createEntity("service", serviceName);
      case "controller":
        return this._createEntity("controller", serviceName);  
    }
    throw new Error("No Provider Specified for " + serviceName);
  }
}

module.exports = new ServiceContainer(ROOT_LEVEL);
