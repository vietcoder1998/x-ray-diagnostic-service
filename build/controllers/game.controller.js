"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("../base/controller");
const code_enum_1 = require("../enums/code.enum");
const game_service_1 = require("../services/game.service");
class GameController extends controller_1.default {
    listen() {
        this.router.get('/:gameId', this.oauth2.guard, (req, res, next) => {
            try {
                const { gameId } = req.params;
                const { page, size } = req.params;
                const gameService = new game_service_1.default();
                if (gameId === 'list') {
                    gameService
                        .getList(parseInt(String(page)), parseInt(String(size)))
                        .then((data) => {
                        res.status(data.subCode).send(data);
                    });
                }
                else {
                    gameService.get(gameId).then((data) => {
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
                const gameService = new game_service_1.default();
                gameService.delete(id).then((data) => {
                    res.status(data.subCode).send(data);
                });
            }
            catch (error) {
                res.status(code_enum_1.CommonCode.UNKNOWN).send(error);
            }
        });
        this.router.post('/create', this.oauth2.guard, (req, res, next) => {
            try {
                const game = req.body;
                const gameService = new game_service_1.default();
                gameService.create(game).then((data) => {
                    res.status(data.subCode).send(data);
                });
            }
            catch (error) {
                res.status(code_enum_1.CommonCode.UNKNOWN).send(error);
            }
        });
    }
}
exports.default = GameController;
