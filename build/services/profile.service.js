"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const services_1 = require("../base/services");
const response_1 = require("../config/response");
const profile_entity_1 = require("../entities/profile.entity");
const code_enum_1 = require("../enums/code.enum");
const message_enum_1 = require("../enums/message.enum");
const uuid = require("uuid");
class ProfileService extends services_1.default {
    async get(profileId) {
        try {
            const profileRespository = typeorm_1.getRepository(profile_entity_1.default);
            const res = await profileRespository.findOne(profileId);
            if (!res) {
                return new response_1.ErrorException(message_enum_1.ProfileErrorMessage.NOT_FOUND, code_enum_1.CommonCode.NOT_FOUND);
            }
            if (!profileId) {
                return new response_1.ErrorException(message_enum_1.ProfileErrorMessage.NO_ID, code_enum_1.CommonCode.NOT_FOUND);
            }
            return new response_1.ResponseData(res);
        }
        catch (err) {
            return new response_1.ErrorException(err);
        }
    }
    async create(profile) {
        try {
            const profileRepository = typeorm_1.getRepository(profile_entity_1.default);
            const profileEntity = new profile_entity_1.default(uuid.v1());
            const res = await profileRepository.save(profileEntity);
            return new response_1.ResponseData(res);
        }
        catch (error) {
            return new response_1.ErrorException(error);
        }
    }
    async update(profileId, profile) {
        try {
            const profileRepository = typeorm_1.getRepository(profile_entity_1.default);
            let profileEntity = await profileRepository.findOne(profileId);
            if (profileEntity) {
                profileEntity = Object.assign(Object.assign({}, profileEntity), profile);
            }
            const res = await profileRepository.update(profileId, profileEntity);
            return new response_1.ResponseData(res);
        }
        catch (error) {
            return new response_1.ErrorException(error);
        }
    }
    async delete(profileId) {
        try {
            const res = await typeorm_1.getRepository(profile_entity_1.default).delete(profileId);
            return new response_1.ErrorException(res);
        }
        catch (error) {
            return new response_1.ErrorException(error);
        }
    }
    async getList(page, size) {
        try {
            const res = await typeorm_1.getRepository(profile_entity_1.default).findAndCount({
                skip: page || 0,
                take: size || 0,
            });
            return new response_1.ResponseData(res[0], page, size, res[1]);
        }
        catch (error) {
            return new response_1.ErrorException(error);
        }
    }
    async deleteMany(profileIds) {
        try {
            const res = await typeorm_1.getRepository(profile_entity_1.default).delete(profileIds);
            return new response_1.ErrorException(res);
        }
        catch (error) {
            return new response_1.ErrorException(error);
        }
    }
}
exports.default = ProfileService;
