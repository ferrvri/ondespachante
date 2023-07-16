import { EditPageControl } from "../../components/edit-page/extensions/edit.page.control.interface";

export class ChangeClienteModel {
    cliente_id: EditPageControl = {
        controlType: 'text',
        disabled: true,
        label: 'ID'
    };
    cliente_nome: EditPageControl = {
        controlType: 'text',
        disabled: false,
        label: 'Nome',
        required: true
    };
    cliente_whatsapp: EditPageControl = {
        controlType: 'text',
        disabled: false,
        label: 'Whatsapp',
        mask: '(00) 0 0000-0000',
    };
    cliente_cep: EditPageControl = {
        controlType: 'text',
        disabled: false,
        mask: '00000-000',
        label: 'CEP',
        onChange: () => { }
    };
    cliente_endereco: EditPageControl = {
        controlType: 'text',
        disabled: true,
        label: 'Endereço'
    };
    cliente_bairro: EditPageControl = {
        controlType: 'text',
        disabled: true,
        label: 'Bairro'
    };
    cliente_cidade: EditPageControl = {
        controlType: 'text',
        disabled: true,
        label: 'Cidade'
    };
    cliente_estado: EditPageControl = {
        controlType: 'text',
        disabled: true,
        label: 'Estado'
    };
    cliente_numero: EditPageControl = {
        controlType: 'text',
        disabled: false,
        label: 'Número'
    };
    cliente_complemento: EditPageControl = {
        controlType: 'text',
        disabled: false,
        label: 'Complemento'
    };
    cliente_rg: EditPageControl = {
        controlType: 'text',
        disabled: false,
        label: 'RG'
    };
    cliente_cpf: EditPageControl = {
        controlType: 'text',
        mask: '000.000.000-00',
        disabled: false,
        label: 'CPF'
    };
    cliente_login: EditPageControl = {
        controlType: 'text',
        disabled: false,
        label: 'Login'
    };
}