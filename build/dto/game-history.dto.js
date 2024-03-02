"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GameHistoryDto {
    /**
     *
     */
    constructor(id, ownerId, state, data, roomId, gold, diamond, createdDate) {
        this.id = id;
        this.ownerId = ownerId;
        this.state = state;
        this.data = data;
        this.roomId = roomId;
        this.gold = gold;
        this.diamond = diamond;
        this.createdDate = createdDate || new Date().getTime();
    }
}
exports.default = GameHistoryDto;
