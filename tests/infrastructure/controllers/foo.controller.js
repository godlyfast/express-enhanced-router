class FooController {
    static $actions() {
        return ['getBar'];
    }
    getBar() {
        return Promise.resolve({bar: 1})
    }
}

module.exports = { FooController };