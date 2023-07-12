const { Router } = require('express');
const requestParamsValidationDecorator = require('../../Shared/decorators/request.params.validation.decorator');
const paginationRequestValidationDecorator = require('../../Shared/decorators/pagination.request.validation.decorator');
const requestBodyValidationDecorator = require('../../Shared/decorators/request.body.validation.decorator');
const CarroDomain = require('../../Domain/Carro/Carro.domain');

module.exports = class CarroController {

    path = '/carro';
    router = Router();
    useAuth = true;

    $mysqlService;

    domain;

    constructor(
        mysqlService
    ) {
        this.$mysqlService = mysqlService;

        this.domain = new CarroDomain(this.$mysqlService);
        this.intializeRoutes();
    }

    intializeRoutes() {
        console.log('[APP] Initializing Controller', this.path);
        this.router.get(`/all`, (request, response) => this.getAllCarroHandler(request, response));
        this.router.get(`/:id`, (request, response) => this.getByIdCarroHandler(request, response));
        this.router.post(`/`, (request, response) => this.saveCarroHandler(request, response));
        this.router.put(`/:id`, (request, response) => this.updateCarroHandler(request, response));

        // this.router.delete(`/:id`, (request, response) => this.getAllCarroHandler(request, response));
    }
    
    getAllCarroHandler(request, response) {
        paginationRequestValidationDecorator(() => this.domain.getAll(request, response), request);
    }

    getByIdCarroHandler(request, response) {
        requestParamsValidationDecorator(() => this.domain.getById(request, response), request, {
            id: ''
        });
    }

    saveCarroHandler(request, response) {
        requestBodyValidationDecorator(() => this.domain.save(request, response), request, {
            carro_renavam: '',
            carro_placa: '',
            cliente_id: ''
        });
    }

    updateCarroHandler(request, response) {
        requestBodyValidationDecorator(() => this.domain.update(request, response), request, {
            carro_renavam: '',
            carro_placa: '',
            cliente_id: ''
        });
    }

}
