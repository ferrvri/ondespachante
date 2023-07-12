const { Server } = require('socket.io');

module.exports = class SocketService {
    $authenticationService;
    $mysqlService;

    clients = [];

    port = 0;

    io = new Server({
        allowEIO3: true,
        cors: {
            methods: '*',
            origin: '*',
        },
        path: '/'
    });

    constructor($mysqlService, $authenticationService, port) {
        this.$mysqlService = $mysqlService;
        this.$authenticationService = $authenticationService;
        this.port = port;
        this.listen();
        this.initialize()
    }

    initialize() {
        this.setAuthentication();
        this.onConnection();
        console.log('[SOCKET Service] Initialized on ', this.port);
    }

    setAuthentication() {
        this.io.use(this.$authenticationService.authentiationSocketMiddleware(this.$mysqlService));
    }

    onConnection() {
        this.io.on("connection", (socket) => {
            console.log('[SOCKET Service] New connection ', socket.id);

            this.clients.push({
                socket,
                data: {}
            });

            socket.on('disconnect', (data) => {
                console.log('[SOCKET Service] Removing from list ', socket.id);
                this.clients = this.clients.filter(e => { return e.socket.id != socket.id });
            });
        });
    }

    listen() {
        this.io.listen(this.port);
    }
}