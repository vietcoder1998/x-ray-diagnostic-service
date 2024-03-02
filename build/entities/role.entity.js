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
const entity_enum_1 = require("../enums/entity.enum");
const api_entity_1 = require("./api.entity");
const user_entity_1 = require("./user.entity");
const role_dto_1 = require("../dto/role.dto");
let RoleEntity = class RoleEntity extends role_dto_1.default {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], RoleEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
    }),
    __metadata("design:type", String)
], RoleEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({
        type: 'text',
    }),
    __metadata("design:type", String)
], RoleEntity.prototype, "description", void 0);
__decorate([
    typeorm_1.ManyToMany((api) => api_entity_1.default, (api) => api.roles, {
        cascade: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], RoleEntity.prototype, "apis", void 0);
__decorate([
    typeorm_1.ManyToOne((user) => user_entity_1.default, (user) => user.role, {
        cascade: true,
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
    }),
    __metadata("design:type", Array)
], RoleEntity.prototype, "users", void 0);
RoleEntity = __decorate([
    typeorm_1.Entity(entity_enum_1.EntityTypes.ROLE)
], RoleEntity);
exports.default = RoleEntity;
