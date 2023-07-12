const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
var fs = require('fs'),
    https = require('https');
const http = require('http');
const verifyJWT = require('./Middlewares/authentication.middleware');

module.exports = class App {
    app = {};
    port = 0;

    // options = {
    //     key: fs.readFileSync('./privkey.pem'),
    //     cert: fs.readFileSync('./cert.pem'),
    // };

    server;

    constructor(controllers, port) {
        this.app = express();
        this.port = port;
        // this.server = https.createServer(this.options, this.app);
        this.server = http.createServer({}, this.app);

        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    initializeMiddlewares() {
        this.app.use(express.urlencoded({ extended: true }));

        this.app.use(bodyParser.json({
            limit: '10mb'
        }));

        this.app.use(cors());
    }

    initializeControllers(controllers) {
        for (let controller of controllers) {
            if (controller.useAuth === true) {
                this.app.use(`${controller.path}`, verifyJWT, controller.router);
            } else {
                this.app.use(`${controller.path}`, controller.router);
            }
        }
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('-------' + new Date().toISOString());
            console.log(`App listening on the port ${this.port}`);
        });
    }
}