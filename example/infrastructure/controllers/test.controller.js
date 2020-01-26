class TestController {
    static $actions() {
        return ['getFoo'];
    }

    static $inject() {
        return ['TestService'];
    }

    getFoo() {
        return this.testService.foo();
    }
}

module.exports = { TestController };