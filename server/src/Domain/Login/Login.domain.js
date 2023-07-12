module.exports = class LoginDomain {
    $authenticationService;

    constructor(
        authenticationService
    ) {
        this.$authenticationService = authenticationService;
    }

    login(request, response) {
        this.$authenticationService.login(request.body.user_login, request.body.user_senha).then(data => {
            response.status(200).json(data);
        }, e => response.status(400).json(e));
    }
}