class TestService {
    static $inject() {
        return ['test'];
    }
    foo() {
        return Promise.resolve(this.test);
    }
}

module.exports = { TestService };