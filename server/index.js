const App = require('./src/App/App');
const MySQLService = require('./src/Shared/services/mysql.service.js');

const dotenv = require('dotenv');
dotenv.config();

const SocketApp = require('./src/App/Socket.App');
const LoginController = require('./src/Controllers/Login/login.controller');
const ClienteController = require('./src/Controllers/Cliente/cliente.controller');
const CarroController = require('./src/Controllers/Carro/carro.controller');
const $mysqlService = new MySQLService();

const $authenticationService = new (require('./src/Shared/services/authentication.service'))($mysqlService);

const controllers = [
    new LoginController($authenticationService, $mysqlService),
    new ClienteController($mysqlService),
    new CarroController($mysqlService)
];

const app = new App(
    controllers,
    +process.env.PORT
);

// const socketApp = new SocketApp($authenticationService, +process.env.SOCKET_PORT);

app.listen();
// socketApp.listen();