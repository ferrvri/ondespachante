const requestParamsValidationDecorator = require("../../Shared/decorators/request.params.validation.decorator");

module.exports = class CarroDomain {
    $mysqlService;

    constructor(
        mysqlService
    ) {
        this.$mysqlService = mysqlService;
    }

    getAll(request, response) {
        this.$mysqlService.queryWithPagination(`
            SELECT 
                carro_id as 'ID',
                carro_renavam as 'Renavam',
                carro_placa as 'Placa'
            FROM carro
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
                carro_id as 'ID',
                carro_renavam as 'Renavam',
                carro_placa as 'Placa'
            FROM carro where carro_id = ?`, [id]).then(carro => {
            response.status(200).json({
                success: true,
                data: carro[0]
            });
        }, e => response.status(400).json(e));
    }

    save(request, response) {
        this.$mysqlService.query(`
            INSERT INTO carro (
                carro_renavam,
                carro_placa
            ) VALUES (?, ?)
        `, [request.body.carro_renavam, request.body.carro_placa]).then(data => {

            response.status(200).json({
                success: true,
                data
            });

        }, e => response.status(400).json(e));
    }

    update(request, response) {
        requestParamsValidationDecorator(() => {
            this.$mysqlService.query(`
            UPDATE carro SET 
            carro_renavam = ?,
            carro_placa = ?
                WHERE carro_id = ?
        `, [request.body.carro_renavam, request.body.carro_placa, request.params.id]).then(data => {

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