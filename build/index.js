"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const express = require("express");
const http = require("http");
const swaggerUi = require("swagger-ui-express");
const oauth2_controller_1 = require("./controllers/oauth2.controller");
const user_controller_1 = require("./controllers/user.controller");
const database_1 = require("./database");
const path_enum_1 = require("./enums/path.enum");
const swagger_1 = require("./swagger");
const ip_1 = require("./utils/ip");
require("reflect-metadata");
const game_controller_1 = require("./controllers/game.controller");
const game_history_controller_1 = require("./controllers/game-history.controller");
const api_controller_1 = require("./controllers/api.controller");
const role_controller_1 = require("./controllers/role.controller");
class ExpressApplicationService {
    constructor() {
        dotenv.config();
        database_1.default();
        this.application = express();
        this.userController = new user_controller_1.default();
        this.oauthController = new oauth2_controller_1.default();
        this.gameController = new game_controller_1.default();
        this.gameHistoryController = new game_history_controller_1.default();
        this.roleController = new role_controller_1.default();
        this.apiController = new api_controller_1.default();
        this.server = http.createServer(this.application);
        this.corsOptions = {
            origin: `http://${ip_1.ip}:${process.env.PORT}`,
            credentials: true,
            optionsSuccessStatus: 200,
        };
    }
    start() {
        //@ts-ignore
        this.application.use(bodyParser.json());
        // router in here
        this.application.use(path_enum_1.default.USER, this.userController.router);
        this.application.use(path_enum_1.default.OAUTH2, this.oauthController.router);
        this.application.use(path_enum_1.default.GAME, this.gameController.router);
        this.application.use(path_enum_1.default.GAME_HISTORY, this.gameHistoryController.router);
        this.application.use(path_enum_1.default.ROLE, this.roleController.router);
        this.application.use(path_enum_1.default.API, this.apiController.router);
        // view
        this.application.get('/', (req, res) => {
            res.sendFile(__dirname + '/public/index.html');
        });
        //@ts-ignore
        this.application.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger_1.default));
        this.application.use((err, req, res, next) => {
            if (err) {
                res.status(403).send('Api not found');
            }
        });
        this.server.listen(process.env.PORT, () => {
            console.log(`start -> \x1b[32m http://${ip_1.ip + process.env.PORT}`);
        });
    }
}
exports.default = ExpressApplicationService;
const application = new ExpressApplicationService();
application.start();
