const { Server } = require('socket.io');

module.exports = class SocketApp {
    $authenticationService;

    port = 0;

    clients = [];

    io = new Server({
        allowEIO3: true,
        cors: {
            methods: '*',
            origin: '*',
        },
        path: '/'
    });

    constructor($authenticationService, port) {
        this.$authenticationService = $authenticationService;
        this.port = port;
        this.initialize()
    }

    initialize() {
        this.setAuthentication();
        this.onConnection();
        console.log('[SOCKET] Initialized ', this.port)
    }

    setAuthentication() {
        this.io.use(this.$authenticationService.authentiationSocketMiddleware())
    }

    onConnection() {
        this.io.on("connection", (socket) => {
            console.log('[SOCKET] New connection ', socket.id);

            this.clients.push({
                socket,
                data: {
                    user: socket.user
                }
            });

            socket.on('loginPool', async (event) => {
                if (event.user_login && event.user_senha) {
                    try {
                        const token = await this.$authenticationService.login(event.user_login, event.user_senha);
                        socket.emit('responseLoginPool', { token });
                    } catch (e) {
                        throw e;
                    }
                }
            });

            socket.on('disconnect', () => {
                console.log('disconnected', socket.id);

                this.clients = this.clients.filter(c => {
                    return c.socket.id != socket.id
                });
            });
        });
    }

    listen() {
        this.io.listen(this.port);
    }
}