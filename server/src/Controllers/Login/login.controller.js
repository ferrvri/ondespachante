const { Router } = require('express');
const requestBodyValidationDecorator = require('../../Shared/decorators/request.body.validation.decorator');
const LoginDomain = require('../../Domain/Login/Login.domain');

module.exports = class LoginController {
    path = '/login';
    router = Router();
    useAuth = false;

    $authenticationService;

    domain;

    constructor(
        authenticationService
    ) {
        this.$authenticationService = authenticationService;

        this.domain = new LoginDomain(this.$authenticationService);
        this.intializeRoutes();
    }

    intializeRoutes() {
        console.log('[APP] Initializing Controller', this.path);
        this.router.post(`/`, (request, response) => this.loginHandler(request, response));;
    }

    async testHandler(request, response) {
        await this.$mysqlService.update('cliente', request.params, request.body);
        response.json({ data: request.body });
    }

    loginHandler(request, response) {
        requestBodyValidationDecorator(() => this.domain.login(request, response), request, {
            user_login: '',
            user_senha: ''
        });
    }
}
