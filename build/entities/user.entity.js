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
const user_dto_1 = require("../dto/user.dto");
const entity_enum_1 = require("../enums/entity.enum");
const account_type_entity_1 = require("./account-type.entity");
const game_history_entity_1 = require("./game-history.entity");
const profile_entity_1 = require("./profile.entity");
const role_entity_1 = require("./role.entity");
let UserEntity = class UserEntity extends user_dto_1.default {
    constructor(id, username, password, email, roleId, accountType, gold, diamond, token, ban) {
        super(id, username, password, email, roleId, accountType, gold, diamond, ban, token);
        this.createdDate = new Date().getTime();
    }
};
__decorate([
    typeorm_1.PrimaryColumn('uuid', { length: 36 }),
    __metadata("design:type", String)
], UserEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        nullable: false,
        default: 'dd',
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "username", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        nullable: true,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({
        type: 'bigint',
        nullable: true,
    }),
    __metadata("design:type", Number)
], UserEntity.prototype, "createdDate", void 0);
__decorate([
    typeorm_1.Column({
        type: 'text',
        nullable: true,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "token", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        nullable: true,
    }),
    __metadata("design:type", Number)
], UserEntity.prototype, "ban", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        nullable: true,
    }),
    __metadata("design:type", Number)
], UserEntity.prototype, "active", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        nullable: true,
        default: 0,
    }),
    __metadata("design:type", Number)
], UserEntity.prototype, "gold", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        nullable: true,
        default: 0,
    }),
    __metadata("design:type", Number)
], UserEntity.prototype, "diamond", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => role_entity_1.default, (role) => role.id, {
        cascade: false,
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
        createForeignKeyConstraints: false,
    }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", role_entity_1.default)
], UserEntity.prototype, "role", void 0);
__decorate([
    typeorm_1.OneToOne((type) => profile_entity_1.default, { cascade: true, onDelete: 'CASCADE' }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", profile_entity_1.default)
], UserEntity.prototype, "profile", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => account_type_entity_1.default, (accountType) => accountType.id, {
        cascade: false,
        onDelete: 'NO ACTION',
        onUpdate: 'RESTRICT',
    }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", account_type_entity_1.default)
], UserEntity.prototype, "accountType", void 0);
__decorate([
    typeorm_1.OneToMany((type) => game_history_entity_1.default, (gameHistoryEntity) => gameHistoryEntity.id, {
        cascade: false,
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',
    }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], UserEntity.prototype, "gameHistories", void 0);
UserEntity = __decorate([
    typeorm_1.Entity(entity_enum_1.EntityTypes.USER),
    __metadata("design:paramtypes", [String, String, String, String, Number, Number, Number, Number, String, Number])
], UserEntity);
exports.default = UserEntity;
