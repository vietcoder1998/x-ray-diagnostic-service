"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("../base/controller");
const code_enum_1 = require("../enums/code.enum");
const game_history_service_1 = require("../services/game-history.service");
class GameHistoryController extends controller_1.default {
    listen() {
        this.router.get('/:id', this.oauth2.guard, (req, res, next) => {
            try {
                const { id } = req.params;
                const gameHistoryService = new game_history_service_1.default();
                if (id === 'list') {
                    gameHistoryService.getList().then((data) => {
                        res.status(data.subCode).send(data);
                    });
                }
                else {
                    gameHistoryService.get(id).then((data) => {
                        res.status(data.subCode).send(data);
                    });
                }
            }
            catch (error) {
                res.status(code_enum_1.CommonCode.UNKNOWN).send(error);
            }
        });
        this.router.delete('/:id', this.oauth2.guard, (req, res, next) => {
            try {
                const { id } = req.params;
                const gameHistoryService = new game_history_service_1.default();
                gameHistoryService.delete(id).then((data) => {
                    res.status(data.subCode).send(data);
                });
            }
            catch (error) {
                res.status(code_enum_1.CommonCode.UNKNOWN).send(error);
            }
        });
        this.router.post('/create', this.oauth2.guard, (req, res, next) => {
            try {
                const user = req.body;
                const gameHistoryService = new game_history_service_1.default();
                gameHistoryService.create(user).then((data) => {
                    res.status(data.subCode).send(data);
                });
            }
            catch (error) {
                res.status(code_enum_1.CommonCode.UNKNOWN).send(error);
            }
        });
    }
}
exports.default = GameHistoryController;
