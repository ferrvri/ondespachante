const requestParamsValidationDecorator = require("../../Shared/decorators/request.params.validation.decorator");

module.exports = class ClienteDomain {
    $mysqlService;

    constructor(
        mysqlService
    ) {
        this.$mysqlService = mysqlService;
    }

    getAll(request, response) {
        this.$mysqlService.queryWithPagination(`SELECT cliente_id, cliente_nome FROM cliente`, [], request.query.page, request.query.pageSize).then(async data => {
            response.status(200).json({
                success: true,
                data: data,
                pagination: {
                    page: +request.query.page,
                    pageSize: +request.query.pageSize,
                    total: (await this.$mysqlService.query(`SELECT count(*) as total FROM cliente`))[0].total
                }
            });
        }, e => response.status(400).json(e));
    }

    async search(request, response) {
        const term = request.params.cliente_nome;
        this.$mysqlService.query(`SELECT * FROM cliente where cliente_nome LIKE CONCAT('%', ?) `, [term]).then(data => {
            response.status(200).json({
                success: true,
                data
            });
        }, e => response.status(400).json(e));
    }

    async getById(request, response) {
        const id = request.params.id;
        this.$mysqlService.query(`SELECT cliente_id, cliente_nome FROM cliente where cliente_id = ? `, [id]).then(cliente => {
            response.status(200).json({
                success: true,
                data: cliente[0]
            });
        }, e => response.status(400).json(e));
    }

    save(request, response) {
        this.$mysqlService.save('cliente', request.body).then(data => {
            response.status(200).json({
                success: true,
                data
            });

        }, e => response.status(400).json(e));
    }

    update(request, response) {
        requestParamsValidationDecorator(() => {
            this.$mysqlService.update('cliente', request.params, request.body).then(data => {
                response.status(200).json({
                    success: true,
                    data
                });
            }, e => response.status(400).json(e));
        }, request, {
            id: ''
        });
    }
}