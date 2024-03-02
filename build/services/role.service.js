"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const services_1 = require("../base/services");
const response_1 = require("../config/response");
const role_entity_1 = require("../entities/role.entity");
const code_enum_1 = require("../enums/code.enum");
const message_enum_1 = require("../enums/message.enum");
class RoleService extends services_1.default {
    async get(roleId) {
        try {
            const roleRepository = typeorm_1.getRepository(role_entity_1.default);
            const res = await roleRepository.findOne(roleId);
            if (!res) {
                return new response_1.ErrorException(message_enum_1.RoleErrorMessage.NOT_FOUND, code_enum_1.CommonCode.NOT_FOUND);
            }
            if (!roleId) {
                return new response_1.ErrorException(message_enum_1.RoleErrorMessage.NO_ID, code_enum_1.CommonCode.NOT_FOUND);
            }
            return new response_1.ResponseData(res);
        }
        catch (err) {
            return new response_1.ErrorException(err);
        }
    }
    async create(role) {
        try {
            const roleRepository = typeorm_1.getRepository(role_entity_1.default);
            let roleEntity = new role_entity_1.default(null, role.name, role.description);
            const res = await roleRepository.save(roleEntity);
            return new response_1.ResponseData(res);
        }
        catch (error) {
            return new response_1.ErrorException(error);
        }
    }
    async update(roleId, role) {
        try {
            const roleRepository = typeorm_1.getRepository(role_entity_1.default);
            let roleEntity = await roleRepository.findOne(roleId);
            if (roleEntity) {
                roleEntity = Object.assign(Object.assign({}, roleEntity), role);
            }
            const res = await roleRepository.update(roleId, roleEntity);
            return new response_1.ResponseData(res);
        }
        catch (error) {
            return new response_1.ErrorException(error);
        }
    }
    async delete(roleId) {
        try {
            const res = await typeorm_1.getRepository(role_entity_1.default).delete(roleId);
            return new response_1.ErrorException(res);
        }
        catch (error) {
            return new response_1.ErrorException(error);
        }
    }
    async getList(page, size) {
        try {
            const res = await typeorm_1.getRepository(role_entity_1.default).findAndCount({
                skip: page || 0,
                take: size || 0,
            });
            console.log(res);
            return new response_1.ResponseData(res[0], page, size, res[1]);
        }
        catch (error) {
            return new response_1.ErrorException(error);
        }
    }
    async deleteMany(roleIds) {
        try {
            const res = await typeorm_1.getRepository(role_entity_1.default).delete(roleIds);
            return new response_1.ErrorException(res);
        }
        catch (error) {
            return new response_1.ErrorException(error);
        }
    }
}
exports.default = RoleService;
