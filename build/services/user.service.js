"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const uuid = require("uuid");
const services_1 = require("../base/services");
const response_1 = require("../config/response");
const profile_dto_1 = require("../dto/profile.dto");
const profile_entity_1 = require("../entities/profile.entity");
const user_entity_1 = require("../entities/user.entity");
const code_enum_1 = require("../enums/code.enum");
const message_enum_1 = require("../enums/message.enum");
class UserService extends services_1.default {
    async get(userId) {
        try {
            console.log(userId);
            const userRepository = typeorm_1.getRepository(user_entity_1.default);
            const res = await userRepository.findOne(userId, {
                relations: ['profile'],
            });
            if (!res) {
                return new response_1.ErrorException(message_enum_1.UserErrorMessage.NOT_FOUND, code_enum_1.CommonCode.NOT_FOUND);
            }
            if (!userId) {
                return new response_1.ErrorException(message_enum_1.UserErrorMessage.NO_ID, code_enum_1.CommonCode.NOT_FOUND);
            }
            return new response_1.ResponseData(res.profile);
        }
        catch (err) {
            return new response_1.ErrorException(err);
        }
    }
    async create(user) {
        try {
            const userRepository = typeorm_1.getRepository(user_entity_1.default);
            const profileRepo = typeorm_1.getRepository(profile_entity_1.default);
            const exUser = await userRepository.findOne({
                username: user.username,
            });
            if (exUser) {
                return new response_1.ErrorException(message_enum_1.UserErrorMessage.CONFLICT, code_enum_1.CommonCode.CONFLICT, message_enum_1.CommonErrorMessage.CONFLICT);
            }
            else {
                const userEntity = new user_entity_1.default(uuid.v1(), user.username, user.password, user.email, 1);
                const profile = new profile_dto_1.default(uuid.v1(), user.username, 0, '_', '_');
                const res0 = await profileRepo.save(profile);
                userEntity.profile = res0;
                const res = await userRepository.save(userEntity);
                return new response_1.ResponseData(res);
            }
        }
        catch (error) {
            return new response_1.ErrorException(error);
        }
    }
    async update(userId, user) {
        try {
            const userRepository = typeorm_1.getRepository(user_entity_1.default);
            let userEntity = await userRepository.findOne(userId);
            if (userEntity) {
                userEntity = Object.assign(Object.assign({}, userEntity), user);
            }
            const res = await userRepository.update(userId, userEntity);
            return new response_1.ResponseData(res);
        }
        catch (error) {
            return new response_1.ErrorException(error);
        }
    }
    async delete(userId) {
        try {
            const res = await typeorm_1.getRepository(user_entity_1.default).delete(userId);
            return new response_1.ResponseData(res);
        }
        catch (error) {
            return new response_1.ErrorException(error);
        }
    }
    async getList(page, size) {
        try {
            const res = await typeorm_1.getRepository(user_entity_1.default).findAndCount({
                skip: page || 0,
                take: size || 0,
                relations: ['profile'],
            });
            const data = res[0].map((user) => user.profile);
            return new response_1.ResponseData(data, page, size, res[1]);
        }
        catch (error) {
            return new response_1.ErrorException(error);
        }
    }
    async deleteMany(userIds) {
        try {
            const res = await typeorm_1.getRepository(user_entity_1.default).delete(userIds);
            return new response_1.ErrorException(res);
        }
        catch (error) {
            return new response_1.ErrorException(error);
        }
    }
}
exports.default = UserService;
