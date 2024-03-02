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
let MethodEntity = class MethodEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], MethodEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        nullable: true,
    }),
    __metadata("design:type", String)
], MethodEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        nullable: true,
    }),
    __metadata("design:type", String)
], MethodEntity.prototype, "description", void 0);
__decorate([
    typeorm_1.OneToMany((type) => api_entity_1.default, (api) => api.method, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }),
    __metadata("design:type", Array)
], MethodEntity.prototype, "apis", void 0);
MethodEntity = __decorate([
    typeorm_1.Entity(entity_enum_1.EntityTypes.METHOD)
], MethodEntity);
exports.default = MethodEntity;
