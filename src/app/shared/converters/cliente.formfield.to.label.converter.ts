export function ClienteFormFieldToLabelConverter(idFromViewModel: string): string {
    return {
        cliente_id: 'ID',
        cliente_nome: 'Nome',
        cliente_whatsapp: 'WhatsApp',
        cliente_cep: 'CEP',
        cliente_endereco: 'Endereço',
        cliente_numero: 'Número',
        cliente_cidade: 'Cidade',
        cliente_estado: 'Estado',
        cliente_rg: 'RG',
        cliente_cpf: 'CPF',
        cliente_bairro: 'Bairro',
        cliente_complemento: 'Complemento',
        cliente_login: 'Login',
    }[idFromViewModel]!;
}