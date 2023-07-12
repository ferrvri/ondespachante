const requestParamsValidationDecorator = require("../../Shared/decorators/request.params.validation.decorator");

module.exports = class OrcamentoDomain {
    $mysqlService;

    constructor(
        mysqlService
    ) {
        this.$mysqlService = mysqlService;
    }

    getAll(request, response) {
        this.$mysqlService.queryWithPagination(`
            SELECT 
                orcamento_id as 'ID',
                orcamento_obs as 'Observação',
                servico_title as 'Servico',
                cliente_nome as 'Cliente',
                orcamento_status as 'Status',
                orcamento_placa as 'Placa',
                orcamento_renavam as 'Renavam'
            FROM orcamento
            INNER JOIN 
                cliente 
            ON orcamento.cliente_id = cliente.cliente_id
            INNER JOIN 
                servico
            ON orcamento.servico_id = servico.servico_id
        `, [], request.query.page, request.query.pageSize).then(async data => {
            response.status(200).json({
                success: true,
                data: data,
                pagination: {
                    page: +request.query.page,
                    pageSize: +request.query.pageSize,
                    total: (await this.$mysqlService.query(`SELECT count(*) as total FROM usuario`))[0].total
                }
            });
        }, e => response.status(400).json(e));
    }

    async getById(request, response) {
        const id = request.params.id;
        this.$mysqlService.query(`
            SELECT 
                orcamento_id as 'ID',
                orcamento_obs as 'Observação',
                servico_title as 'Servico',
                cliente_nome as 'Cliente',
                orcamento_status as 'Status',
                orcamento_placa as 'Placa',
                orcamento_renavam as 'Renavam'
            FROM orcamento
            INNER JOIN 
                cliente 
            ON orcamento.cliente_id = cliente.cliente_id
            INNER JOIN 
                servico
            ON orcamento.servico_id = servico.servico_id
            Where orcamento_id = ?`, [id]).then(orcamento => {
            response.status(200).json({
                success: true,
                data: orcamento[0]
            });
        }, e => response.status(400).json(e));
    }

    save(request, response) {
        this.$mysqlService.save(`orcamento`, request.body).then(data => {

            response.status(200).json({
                success: true,
                data
            });

        }, e => response.status(400).json(e));
    }

    update(request, response) {
        requestParamsValidationDecorator(() => {
            this.$mysqlService.update(`orcamento`, request.params, request.body).then(data => {

                response.status(200).json({
                    success: true,
                    data
                });

            }, e => response.status(400).json(e));
        }, request, {
            orcamento_id: ''
        });
    }
}