"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PaymentDto {
    constructor(id, game, ownderId, unit, createdDate, state, lastQuantity, updateQuantity) {
        this.id = id;
        this.game = game;
        this.createdDate = createdDate;
        this.state = state;
        this.lastQuantity = lastQuantity;
        this.updateQuantity = updateQuantity;
        this.ownerId = ownderId;
        this.unit = unit;
    }
}
exports.default = PaymentDto;
