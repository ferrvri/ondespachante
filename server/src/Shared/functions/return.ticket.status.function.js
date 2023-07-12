module.exports = function returnTicketStatus(status) {
    return {
        'A': 'Em Aberto',
        'EA': 'Em analise',
        'ES': 'Esperando retorno',
        'PR': 'Pós retorno',
        'R': 'Resolvido',
    }[status];
}