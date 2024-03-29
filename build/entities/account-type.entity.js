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
const account_type_dto_1 = require("../dto/account-type.dto");
const entity_enum_1 = require("../enums/entity.enum");
const user_entity_1 = require("./user.entity");
let AccountTypeEntity = class AccountTypeEntity extends account_type_dto_1.default {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], AccountTypeEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ name: 'name', type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], AccountTypeEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ name: 'description', type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], AccountTypeEntity.prototype, "description", void 0);
__decorate([
    typeorm_1.OneToMany((type) => user_entity_1.default, (userEntity) => userEntity.accountType),
    __metadata("design:type", Array)
], AccountTypeEntity.prototype, "users", void 0);
AccountTypeEntity = __decorate([
    typeorm_1.Entity(entity_enum_1.EntityTypes.ACCOUNT_TYPE)
], AccountTypeEntity);
exports.default = AccountTypeEntity;
