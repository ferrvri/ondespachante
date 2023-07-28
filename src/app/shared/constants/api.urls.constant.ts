export const API_URLS = {
    Login: '/login',
    Cliente: {
        Search: '/cliente/search/:Nome',
        All: '/cliente/all',
        Save: '/cliente',
        GetById: '/cliente/:Id'
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
        All: '/orcamento/all',
        Filter: '/orcamento/filter'
    },
    Ui: {
        Menu: '/ui/menu'
    }
}