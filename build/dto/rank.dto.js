"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RankDto {
    /**
     *
     */
    constructor(id, ownerId, score, gameId) {
        this.id = id;
        this.ownerId = ownerId;
        this.score = score;
        this.gameId = gameId;
    }
}
exports.default = RankDto;
