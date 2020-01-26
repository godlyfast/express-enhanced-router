# express-enhanced-router

Gives express.js router Infrastructure that it deserves

## Usage

```bash
npm install --save express-enhanced-router
```

### Create those dirs at root of your project

- infrastructure/controllers
- infrastructure/factories
- infrastructure/services

### Controllers

Those are needed for handling your requests, action methods are expected to return Promise

Create `infrastructure/controllers/test.controller.js`

```javascript
class TestController {
    static $inject() { return ['TestService']; } // return list of injectables from your service folder
    static $actions() { return ['getFoo']; } // return list of your controller's actions
    getFoo(request, response) {
        return this.testService.foo()
    }
}
module.exports = { TestController };
```

### Providers

Those are just functions that provides entities for Dependency Injection

Create `infrastructure/providers/test.provider.js`

```javascript

function TestProvider() {
  const test = {
    var1: 1,
    var2: 2,
  };
  return test;
}

module.exports = {
  TestProvider
};

```

### Services

Those are your Dependency Injection enabled Services

Create `infrastructure/services/test.service.js`

```javascript

class TestService {
    static $inject() { return ['test']; } // this will hook up TestProvider
    foo() {
        return new Promise((resolve, reject) => {
            resolve({
                result: 'fooResult',
                ...this.test
            })
        })
    }
}

module.exports = { TestService };

```

### index.js

```javascript
const express = require('express');
const enhancedRouter = require('express-enhanced-router');

const app = express();

const router = express.Router();

app.use(enhancedRouter(router));

app.listen(3000, (err) => {
    console.log('Listening at port 3000 ...');
})
```

### That's IT
