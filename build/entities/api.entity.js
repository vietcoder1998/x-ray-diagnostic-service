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
const api_dto_1 = require("../dto/api.dto");
const entity_enum_1 = require("../enums/entity.enum");
const method_entity_1 = require("./method.entity");
const module_entity_1 = require("./module.entity");
const role_entity_1 = require("./role.entity");
let ApiEntity = class ApiEntity extends api_dto_1.default {
    constructor(id, path, description) {
        super(id, path, description);
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ApiEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        nullable: true,
        default: '',
    }),
    __metadata("design:type", String)
], ApiEntity.prototype, "path", void 0);
__decorate([
    typeorm_1.Column({
        type: 'text',
        nullable: true,
    }),
    __metadata("design:type", String)
], ApiEntity.prototype, "description", void 0);
__decorate([
    typeorm_1.ManyToOne((module) => module_entity_1.default, (module) => module.apis, {
        cascade: false,
        onDelete: 'NO ACTION',
    }),
    typeorm_1.JoinColumn({ name: 'moduleId' }),
    __metadata("design:type", module_entity_1.default
    // many to many with method
    )
], ApiEntity.prototype, "module", void 0);
__decorate([
    typeorm_1.ManyToOne((method) => method_entity_1.default, (method) => method.apis),
    typeorm_1.JoinColumn({ name: 'methodId' }),
    __metadata("design:type", method_entity_1.default
    // Many to many with role
    )
], ApiEntity.prototype, "method", void 0);
__decorate([
    typeorm_1.ManyToMany((role) => role_entity_1.default, (role) => role.apis, {
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',
    }),
    typeorm_1.JoinTable({ name: 'api_role' }),
    __metadata("design:type", Array)
], ApiEntity.prototype, "roles", void 0);
ApiEntity = __decorate([
    typeorm_1.Entity(entity_enum_1.EntityTypes.API),
    __metadata("design:paramtypes", [Number, String, String])
], ApiEntity);
exports.default = ApiEntity;
