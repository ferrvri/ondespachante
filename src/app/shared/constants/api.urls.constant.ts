export const API_URLS = {
    Login: '/login',
    Cliente: {
        Search: '/cliente/search/:Nome',
        All: '/cliente/all'
    },
    Servicos: {
        All: '/servicos/all'
    },
    Assets: '/assets/',
    Orcamento: {
        Save: '/orcamento',
        Update: '/orcamento/:ID',
        UpdateStatus: '/orcamento/status/:orcamento_id',
        Delete: '/orcamento/:ID',
        Search: '/orcamento/:ID',
        All: '/orcamento/all'
    },
    Ui: {
        Menu: '/ui/menu'
    }
}