export interface ServicoModel {
    servico_id?:number;
    servico_title: string;
    servico_descricao: string;
    servico_valor?: string;
    servico_logo_url?: string;
    created_at?: string;
}