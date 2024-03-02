"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const services_1 = require("../base/services");
const response_1 = require("../config/response");
const game_entity_1 = require("../entities/game.entity");
const code_enum_1 = require("../enums/code.enum");
const message_enum_1 = require("../enums/message.enum");
class GameService extends services_1.default {
    async get(gameId) {
        try {
            const gameRepository = typeorm_1.getRepository(game_entity_1.default);
            const res = await gameRepository.findOne(gameId);
            if (!res) {
                return new response_1.ErrorException(message_enum_1.GameErrorMessage.NOT_FOUND, code_enum_1.CommonCode.NOT_FOUND);
            }
            if (!gameId) {
                return new response_1.ErrorException(message_enum_1.GameErrorMessage.NO_ID, code_enum_1.CommonCode.NOT_FOUND);
            }
            return new response_1.ResponseData(res);
        }
        catch (err) {
            return new response_1.ErrorException(err);
        }
    }
    async create(game) {
        try {
            const gameRepository = typeorm_1.getRepository(game_entity_1.default);
            let gameEntity = new game_entity_1.default(null, game.name, game.description, game.ip);
            const res = await gameRepository.save(gameEntity);
            return new response_1.ResponseData(res);
        }
        catch (error) {
            return new response_1.ErrorException(error);
        }
    }
    async update(gameId, game) {
        try {
            const gameRepository = typeorm_1.getRepository(game_entity_1.default);
            let gameEntity = await gameRepository.findOne(gameId);
            if (gameEntity) {
                gameEntity = Object.assign(Object.assign({}, gameEntity), game);
            }
            const res = await gameRepository.update(gameId, gameEntity);
            return new response_1.ResponseData(res);
        }
        catch (error) {
            return new response_1.ErrorException(error);
        }
    }
    async delete(gameId) {
        try {
            const res = await typeorm_1.getRepository(game_entity_1.default).delete(gameId);
            return new response_1.ErrorException(res);
        }
        catch (error) {
            return new response_1.ErrorException(error);
        }
    }
    async getList(page, size) {
        try {
            const res = await typeorm_1.getRepository(game_entity_1.default).findAndCount({
                skip: page || 0,
                take: size || 0,
            });
            return new response_1.ResponseData(res[0], page, size, res[1]);
        }
        catch (error) {
            return new response_1.ErrorException(error);
        }
    }
    async deleteMany(gameIds) {
        try {
            const res = await typeorm_1.getRepository(game_entity_1.default).delete(gameIds);
            return new response_1.ErrorException(res);
        }
        catch (error) {
            return new response_1.ErrorException(error);
        }
    }
}
exports.default = GameService;
