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
const game_dto_1 = require("../dto/game.dto");
const entity_enum_1 = require("../enums/entity.enum");
let GameEntity = class GameEntity extends game_dto_1.default {
    constructor(id, name, description, ip) {
        super(id, name, description, ip);
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], GameEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        nullable: true,
    }),
    __metadata("design:type", String)
], GameEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        nullable: true,
    }),
    __metadata("design:type", String)
], GameEntity.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        nullable: true,
    }),
    __metadata("design:type", String)
], GameEntity.prototype, "ip", void 0);
GameEntity = __decorate([
    typeorm_1.Entity(entity_enum_1.EntityTypes.GAME),
    __metadata("design:paramtypes", [Number, String, String, String])
], GameEntity);
exports.default = GameEntity;
