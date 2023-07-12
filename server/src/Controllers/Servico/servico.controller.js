const { Router } = require('express');
const requestParamsValidationDecorator = require('../../Shared/decorators/request.params.validation.decorator');
const paginationRequestValidationDecorator = require('../../Shared/decorators/pagination.request.validation.decorator');
const requestBodyValidationDecorator = require('../../Shared/decorators/request.body.validation.decorator');
const ServicoDomain = require('../../Domain/Servico/Servico.domain');

module.exports = class ServicoController {

    path = '/servico';
    router = Router();
    useAuth = true;

    $mysqlService;

    domain;

    constructor(
        mysqlService
    ) {
        this.$mysqlService = mysqlService;

        this.domain = new ServicoDomain(this.$mysqlService);
        this.intializeRoutes();
    }

    intializeRoutes() {
        console.log('[APP] Initializing Controller', this.path);
        this.router.get(`/all`, (request, response) => this.getAllServicoHandler(request, response));
        this.router.get(`/:servico_id`, (request, response) => this.getByIdServicoHandler(request, response));
        this.router.post(`/`, (request, response) => this.saveServicoHandler(request, response));
        this.router.put(`/:servico_id`, (request, response) => this.updateServicoHandler(request, response));

        // this.router.delete(`/:id`, (request, response) => this.getAllServicoHandler(request, response));
    }
    
    getAllServicoHandler(request, response) {
        paginationRequestValidationDecorator(() => this.domain.getAll(request, response), request);
    }

    getByIdServicoHandler(request, response) {
        requestParamsValidationDecorator(() => this.domain.getById(request, response), request, {
            servico_id: ''
        });
    }

    saveServicoHandler(request, response) {
        requestBodyValidationDecorator(() => this.domain.save(request, response), request, {
            servico_title: '',
            servico_descricao: '',
            servico_valor: ''
        });
    }

    updateServicoHandler(request, response) {
        requestBodyValidationDecorator(() => this.domain.update(request, response), request, {
            servico_title: '',
            servico_descricao: '',
            servico_valor: ''
        });
    }

}
