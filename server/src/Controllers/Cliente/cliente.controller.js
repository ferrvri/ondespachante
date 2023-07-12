const { Router } = require('express');
const ClienteDomain = require('../../Domain/Cliente/Cliente.domain');
const requestParamsValidationDecorator = require('../../Shared/decorators/request.params.validation.decorator');
const paginationRequestValidationDecorator = require('../../Shared/decorators/pagination.request.validation.decorator');
const requestBodyValidationDecorator = require('../../Shared/decorators/request.body.validation.decorator');

module.exports = class ClienteController {

    path = '/cliente';
    router = Router();
    useAuth = true;

    $mysqlService;

    domain;

    constructor(
        mysqlService
    ) {
        this.$mysqlService = mysqlService;

        this.domain = new ClienteDomain(this.$mysqlService);
        this.intializeRoutes();
    }

    intializeRoutes() {
        console.log('[APP] Initializing Controller', this.path);
        this.router.get(`/search/:cliente_nome`, (request, response) => this.searchAllClienteHandler(request, response));
        this.router.get(`/all`, (request, response) => this.getAllClienteHandler(request, response));
        this.router.get(`/:id`, (request, response) => this.getByIdClienteHandler(request, response));
        this.router.post(`/`, (request, response) => this.saveClienteHandler(request, response));
        this.router.put(`/:id`, (request, response) => this.updateClienteHandler(request, response));

        // this.router.delete(`/:id`, (request, response) => this.getAllClienteHandler(request, response));
    }

    searchAllClienteHandler(request, response) {
        requestParamsValidationDecorator(() => this.domain.search(request, response), request, {
            cliente_nome: ''
        })
    }

    getAllClienteHandler(request, response) {
        paginationRequestValidationDecorator(() => this.domain.getAll(request, response), request);
    }

    getByIdClienteHandler(request, response) {
        requestParamsValidationDecorator(() => this.domain.getById(request, response), request, {
            id: ''
        });
    }

    saveClienteHandler(request, response) {
        requestBodyValidationDecorator(() => this.domain.save(request, response), request, {
            cliente_nome: '',
            cliente_razao_social: '',
            cliente_telefone: '',
            cliente_whatsapp: '',
            cliente_email: '',
            cliente_cep: '',
            cliente_endereco: '',
            cliente_numero: '',
            cliente_cidade: '',
            cliente_estado: '',
            cliente_rg: '',
            cliente_cpf: '',
            cliente_bairro: '',
            cliente_complemento: '',
            cliente_senha: ''
        });
    }

    updateClienteHandler(request, response) {
        requestBodyValidationDecorator(() => this.domain.update(request, response), request, {
            cliente_nome: '',
            cliente_razao_social: '',
            cliente_telefone: '',
            cliente_whatsapp: '',
            cliente_email: '',
            cliente_cep: '',
            cliente_endereco: '',
            cliente_numero: '',
            cliente_cidade: '',
            cliente_estado: '',
            cliente_rg: '',
            cliente_cpf: '',
            cliente_bairro: '',
            cliente_complemento: '',
            cliente_senha: ''
        });
    }

}
