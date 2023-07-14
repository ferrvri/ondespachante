export interface OrcamentoModel {
    orcamento_id: number;
    orcamento_obs: string;
    servico_id?: number;
    cliente_id?: number;
    orcamento_status: string;
    orcamento_placa: string;
    orcamento_renavam: string;
    orcamento_whatsapp: string;
    created_at?: string;
}