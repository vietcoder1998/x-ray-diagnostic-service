"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const services_1 = require("../base/services");
const response_1 = require("../config/response");
const api_entity_1 = require("../entities/api.entity");
const module_entity_1 = require("../entities/module.entity");
const role_entity_1 = require("../entities/role.entity");
const code_enum_1 = require("../enums/code.enum");
const message_enum_1 = require("../enums/message.enum");
class ApiService extends services_1.default {
    async get(apiId) {
        try {
            const apiRepository = typeorm_1.getRepository(api_entity_1.default);
            const res = await apiRepository.findOne(apiId);
            if (!res) {
                return new response_1.ErrorException(message_enum_1.ApiErrorMessage.NOT_FOUND, code_enum_1.CommonCode.NOT_FOUND);
            }
            if (!apiId) {
                return new response_1.ErrorException(message_enum_1.ApiErrorMessage.NO_ID, code_enum_1.CommonCode.NOT_FOUND);
            }
            return new response_1.ResponseData(res);
        }
        catch (err) {
            return new response_1.ErrorException(err);
        }
    }
    async create(api, moduleId, methodId, roleIds) {
        try {
            const apiRepo = typeorm_1.getRepository(api_entity_1.default);
            const roleRepo = typeorm_1.getRepository(role_entity_1.default);
            const moduleRepo = typeorm_1.getRepository(module_entity_1.default);
            if (!api) {
                return new response_1.ErrorException(message_enum_1.ApiErrorMessage.API_DTO, code_enum_1.CommonCode.BAD_REQUEST, message_enum_1.CommonMessage.BAD_REQUEST);
            }
            if (roleIds) {
                return new response_1.ErrorException(message_enum_1.ApiErrorMessage.ROLE_IDS, code_enum_1.CommonCode.BAD_REQUEST, message_enum_1.CommonMessage.BAD_REQUEST);
            }
            if (moduleId) {
                return new response_1.ErrorException(message_enum_1.ApiErrorMessage.RQ_BODY_FAIL, code_enum_1.CommonCode.BAD_REQUEST, message_enum_1.CommonMessage.BAD_REQUEST);
            }
            if (!moduleId) {
                return new response_1.ErrorException(message_enum_1.ApiErrorMessage.RQ_BODY_FAIL, code_enum_1.CommonCode.BAD_REQUEST, message_enum_1.CommonMessage.BAD_REQUEST);
            }
            const exApi = await apiRepo.findOne({ where: { path: api.path } });
            if (exApi) {
                return new response_1.ErrorException(message_enum_1.ApiErrorMessage.CONFLICT, code_enum_1.CommonCode.CONFLICT, message_enum_1.CommonMessage.CONFLICT);
            }
            let apiEntity = new api_entity_1.default(null, api.path, api.description);
            const rolesEntities = await roleRepo.findByIds(roleIds);
            const moduleEntity = await moduleRepo.findOne(moduleId);
            const methodEntity = await moduleRepo.findOne(methodId);
            if (!rolesEntities) {
                return new response_1.ErrorException(message_enum_1.RoleErrorMessage.NOT_FOUND, code_enum_1.CommonCode.NOT_FOUND, message_enum_1.CommonMessage.NOT_FOUND);
            }
            if (!moduleEntity) {
                return new response_1.ErrorException('Not found', code_enum_1.CommonCode.NOT_FOUND, message_enum_1.CommonMessage.NOT_FOUND);
            }
            if (!methodEntity) {
                return new response_1.ErrorException('Not found', code_enum_1.CommonCode.NOT_FOUND, message_enum_1.CommonMessage.NOT_FOUND);
            }
            apiEntity.method = methodEntity;
            apiEntity.module = moduleEntity;
            apiEntity.roles = rolesEntities;
            const res = await apiRepo.save(apiEntity);
            return new response_1.ResponseData(res);
        }
        catch (error) {
            return new response_1.ErrorException(error);
        }
    }
    async update(apiId, api) {
        try {
            const apiRepository = typeorm_1.getRepository(api_entity_1.default);
            let apiEntity = await apiRepository.findOne(apiId);
            if (apiEntity) {
                apiEntity = Object.assign(Object.assign({}, apiEntity), api);
            }
            const res = await apiRepository.update(apiId, apiEntity);
            return new response_1.ResponseData(res);
        }
        catch (error) {
            return new response_1.ErrorException(error);
        }
    }
    async updateApiWithRole(apiId, roleIds) {
        try {
            const apiRepo = typeorm_1.getRepository(api_entity_1.default);
            const roleRepo = typeorm_1.getRepository(role_entity_1.default);
            const apiEntity = await apiRepo.findOne({
                where: { id: parseInt(apiId) },
                relations: ['roles'],
            });
            if (!apiId || !apiEntity) {
                return new response_1.ErrorException(message_enum_1.ApiErrorMessage.NOT_FOUND, code_enum_1.CommonCode.NOT_FOUND, message_enum_1.CommonMessage.NOT_FOUND);
            }
            const roles = apiEntity.roles;
            const addRoles = await roleRepo.findByIds(roleIds);
            if (!addRoles || addRoles.length === 0) {
                return new response_1.ErrorException(message_enum_1.RoleErrorMessage.NOT_FOUND, code_enum_1.CommonCode.NOT_FOUND, message_enum_1.CommonMessage.NOT_FOUND);
            }
            else {
                if (!roles || roles.length === 0) {
                    apiEntity.roles = addRoles;
                }
                else {
                    addRoles.forEach((addRole, i) => {
                        if (!roles.map((item) => item.id).includes(addRole.id)) {
                            roles.push(addRole);
                        }
                    });
                    apiEntity.roles = roles;
                }
                const res = await apiRepo.save(apiEntity);
                return new response_1.ResponseData(res);
            }
        }
        catch (error) {
            return new response_1.ErrorException(error);
        }
    }
    async delete(apiId) {
        try {
            const res = await typeorm_1.getRepository(api_entity_1.default).delete(apiId);
            return new response_1.ErrorException(res);
        }
        catch (error) {
            return new response_1.ErrorException(error);
        }
    }
    async getList(page, size) {
        try {
            const res = await typeorm_1.getRepository(api_entity_1.default).findAndCount({
                skip: page || 0,
                take: size || 0,
                relations: ['roles', 'method'],
            });
            return new response_1.ResponseData(res[0], page, size, res[1]);
        }
        catch (error) {
            return new response_1.ErrorException(error);
        }
    }
    async deleteMany(apiIds) {
        try {
            const res = await typeorm_1.getRepository(api_entity_1.default).delete(apiIds);
            return new response_1.ErrorException(res);
        }
        catch (error) {
            return new response_1.ErrorException(error);
        }
    }
}
exports.default = ApiService;
