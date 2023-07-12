module.exports = function returnOrderStatus(status) {
    return {
        'A': 'Em Aberto',
        'PB': 'Pagamento Aberto',
        'PA': 'Pago',
        'P': 'Preparação',
        'AC': 'A caminho',
        'E': 'Entregue',
        'TA': 'Ticket de Suporte Aberto',
        'TE': 'Ticket em Espera de Retorno',
        'TF': 'Ticket finalizado'
    }[status];
}