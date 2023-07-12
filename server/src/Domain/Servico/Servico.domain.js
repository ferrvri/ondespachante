const requestParamsValidationDecorator = require("../../Shared/decorators/request.params.validation.decorator");

module.exports = class ServicoDomain {
    $mysqlService;

    constructor(
        mysqlService
    ) {
        this.$mysqlService = mysqlService;
    }

    getAll(request, response) {
        this.$mysqlService.queryWithPagination(`
            SELECT 
                servico_id as 'ID',
                servico_title as 'Titulo',
                servico_descricao as 'Descrição',
                servico_valor as 'Valor'
            FROM servico
        `, [], request.query.page, request.query.pageSize).then(async data => {
            response.status(200).json({
                success: true,
                data: data,
                pagination: {
                    page: +request.query.page,
                    pageSize: +request.query.pageSize,
                    total: (await this.$mysqlService.query(`SELECT count(*) as total FROM servico`))[0].total
                }
            });
        }, e => response.status(400).json(e));
    }

    async getById(request, response) {
        const id = request.params.id;
        this.$mysqlService.query(`
            SELECT 
                servico_id as 'ID',
                servico_title as 'Titulo',
                servico_descricao as 'Descrição',
                servico_valor as 'Valor'
            FROM servico where servico_id = ?`, [id]).then(servico => {
            response.status(200).json({
                success: true,
                data: servico[0]
            });
        }, e => response.status(400).json(e));
    }

    save(request, response) {
        this.$mysqlService.save('servico', request.body).then(data => {
            response.status(200).json({
                success: true,
                data
            });
        }, e => response.status(400).json(e));
    }

    update(request, response) {
        requestParamsValidationDecorator(() => {
            this.$mysqlService.update('servico', request.params, request.body).then(data => {
                response.status(200).json({
                    success: true,
                    data
                });
            }, e => response.status(400).json(e));
        }, request, {
            servico_id: ''
        });
    }
}