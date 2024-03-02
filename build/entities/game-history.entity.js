"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const game_history_dto_1 = require("../dto/game-history.dto");
const entity_enum_1 = require("../enums/entity.enum");
const time_1 = require("../utils/time");
const game_entity_1 = require("./game.entity");
const user_entity_1 = require("./user.entity");
let GameHistoryEntity = class GameHistoryEntity extends game_history_dto_1.default {
    constructor(id, ownerId, state, data, roomId, gold, diamond, createdDate) {
        super(id, ownerId, state, data, roomId, gold, diamond);
        this.createdDate = createdDate || time_1.default;
    }
};
__decorate([
    typeorm_1.PrimaryColumn('uuid', { length: 36 }),
    __metadata("design:type", String)
], GameHistoryEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        nullable: true,
    }),
    __metadata("design:type", Number)
], GameHistoryEntity.prototype, "state", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        nullable: false,
    }),
    __metadata("design:type", Number)
], GameHistoryEntity.prototype, "roomId", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        nullable: false,
    }),
    __metadata("design:type", Number)
], GameHistoryEntity.prototype, "gold", void 0);
__decorate([
    typeorm_1.Column({
        type: 'text',
        nullable: false,
    }),
    __metadata("design:type", String)
], GameHistoryEntity.prototype, "data", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        nullable: false,
    }),
    __metadata("design:type", Number)
], GameHistoryEntity.prototype, "createdDate", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_entity_1.default, (userEntity) => userEntity.id),
    typeorm_1.JoinColumn({ name: 'ownerId' }),
    __metadata("design:type", String)
], GameHistoryEntity.prototype, "ownerId", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => game_entity_1.default, (gameEntity) => gameEntity.id),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Number)
], GameHistoryEntity.prototype, "gameId", void 0);
GameHistoryEntity = __decorate([
    typeorm_1.Entity(entity_enum_1.EntityTypes.GAME_HISTORY),
    __metadata("design:paramtypes", [String, String, Number, String, Number, Number, Number, Number])
], GameHistoryEntity);
exports.default = GameHistoryEntity;
