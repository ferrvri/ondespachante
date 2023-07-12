const { Router } = require('express');
const requestParamsValidationDecorator = require('../../Shared/decorators/request.params.validation.decorator');
const paginationRequestValidationDecorator = require('../../Shared/decorators/pagination.request.validation.decorator');
const requestBodyValidationDecorator = require('../../Shared/decorators/request.body.validation.decorator');
const CarroDomain = require('../../Domain/Carro/Carro.domain');
const OrcamentoDomain = require('../../Domain/Orcamento/Orcamento.domain');

module.exports = class OrcamentoController {

    path = '/orcamento';
    router = Router();
    useAuth = true;

    $mysqlService;

    domain;

    constructor(
        mysqlService
    ) {
        this.$mysqlService = mysqlService;

        this.domain = new OrcamentoDomain(this.$mysqlService);
        this.intializeRoutes();
    }

    intializeRoutes() {
        console.log('[APP] Initializing Controller', this.path);
        this.router.get(`/all`, (request, response) => this.getAllCarroHandler(request, response));
        this.router.get(`/:orcamento_id`, (request, response) => this.getByIdCarroHandler(request, response));
        this.router.post(`/`, (request, response) => this.saveCarroHandler(request, response));
        this.router.put(`/:orcamento_id`, (request, response) => this.updateCarroHandler(request, response));

        // this.router.delete(`/:orcamento_id`, (request, response) => this.getAllCarroHandler(request, response));
    }

    getAllCarroHandler(request, response) {
        paginationRequestValidationDecorator(() => this.domain.getAll(request, response), request);
    }

    getByIdCarroHandler(request, response) {
        requestParamsValidationDecorator(() => this.domain.getById(request, response), request, {
            orcamento_id: ''
        });
    }

    saveCarroHandler(request, response) {
        requestBodyValidationDecorator(() => this.domain.save(request, response), request, {
            orcamento_obs: '',
            servico_id: '',
            cliente_id: '',
            orcamento_status: '',
            orcamento_placa: '',
            orcamento_renavam: ''
        });
    }

    updateCarroHandler(request, response) {
        requestBodyValidationDecorator(() => this.domain.update(request, response), request, {
            orcamento_obs: '',
            servico_id: '',
            cliente_id: '',
            orcamento_status: '',
            orcamento_placa: '',
            orcamento_renavam: ''
        });
    }

}
