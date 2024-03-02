"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const services_1 = require("../base/services");
const response_1 = require("../config/response");
const game_history_entity_1 = require("../entities/game-history.entity");
const code_enum_1 = require("../enums/code.enum");
const message_enum_1 = require("../enums/message.enum");
class GameHistoryService extends services_1.default {
    async get(gameHistoryId) {
        try {
            const gameHistoryRepository = typeorm_1.getRepository(game_history_entity_1.default);
            const res = await gameHistoryRepository.findOne(gameHistoryId, {
                relations: ['game'],
            });
            if (!res) {
                return new response_1.ErrorException(message_enum_1.GameHistoryErrorMessage.NOT_FOUND, code_enum_1.CommonCode.NOT_FOUND);
            }
            if (!gameHistoryId) {
                return new response_1.ErrorException(message_enum_1.GameHistoryErrorMessage.NO_ID, code_enum_1.CommonCode.NOT_FOUND);
            }
            return new response_1.ResponseData(res);
        }
        catch (err) {
            return new response_1.ErrorException(err);
        }
    }
    async create(gameHistory) {
        try {
            const gameHistoryRepository = typeorm_1.getRepository(game_history_entity_1.default);
            let gameHistoryEntity = new game_history_entity_1.default(null, gameHistory.ownerId, gameHistory.state, gameHistory.data, gameHistory.roomId, gameHistory.gold, gameHistory.diamond, gameHistory.createdDate);
            const res = await gameHistoryRepository.save(gameHistoryEntity);
            return new response_1.ResponseData(res);
        }
        catch (error) {
            return new response_1.ErrorException(error);
        }
    }
    async update(gameHistoryId, gameHistory) {
        try {
            const gameHistoryRepository = typeorm_1.getRepository(game_history_entity_1.default);
            let gameHistoryEntity = await gameHistoryRepository.findOne(gameHistoryId);
            if (gameHistoryEntity) {
                gameHistoryEntity = Object.assign(Object.assign({}, gameHistoryEntity), gameHistory);
            }
            const res = await gameHistoryRepository.update(gameHistoryId, gameHistoryEntity);
            return new response_1.ResponseData(res);
        }
        catch (error) {
            return new response_1.ErrorException(error);
        }
    }
    async delete(gameHistoryId) {
        try {
            const res = await typeorm_1.getRepository(game_history_entity_1.default).delete(gameHistoryId);
            return new response_1.ErrorException(res);
        }
        catch (error) {
            return new response_1.ErrorException(error);
        }
    }
    async getList(page, size) {
        try {
            const res = await typeorm_1.getRepository(game_history_entity_1.default).findAndCount({
                skip: page || 0,
                take: size || 0,
                relations: ['profile'],
            });
            return new response_1.ResponseData(res[0], page, size, res[1]);
        }
        catch (error) {
            return new response_1.ErrorException(error);
        }
    }
    async deleteMany(gameHistoryIds) {
        try {
            const res = await typeorm_1.getRepository(game_history_entity_1.default).delete(gameHistoryIds);
            return new response_1.ErrorException(res);
        }
        catch (error) {
            return new response_1.ErrorException(error);
        }
    }
}
exports.default = GameHistoryService;
