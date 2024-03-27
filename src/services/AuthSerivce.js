const { default: ApiClient } = require("./ApiClient");

class AuthSerivce extends ApiClient {
    doLogin(payload) {
       return this.post('/auth', payload)
    }
}

export default new AuthSerivce();