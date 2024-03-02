"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const typeorm_1 = require("typeorm");
const response_1 = require("../config/response");
const api_entity_1 = require("../entities/api.entity");
const profile_entity_1 = require("../entities/profile.entity");
const user_entity_1 = require("../entities/user.entity");
const code_enum_1 = require("../enums/code.enum");
const message_enum_1 = require("../enums/message.enum");
const oauth2_1 = require("../oauth2");
const role_entity_1 = require("../entities/role.entity");
const account_type_entity_1 = require("../entities/account-type.entity");
class Oauth2Service {
    constructor() {
        this.oauth2 = new oauth2_1.default();
    }
    async logout(userId, token) {
        try {
            if (!userId) {
                return new response_1.ErrorException(message_enum_1.CommonErrorMessage.NOT_FOUND, code_enum_1.UserErrorCode.NOT_FOUND, message_enum_1.UserErrorMessage.NO_ID);
            }
            if (!token) {
                return new response_1.ErrorException(message_enum_1.CommonErrorMessage.TOKEN_INVALID, code_enum_1.TokenErrorCode.INVALID, message_enum_1.CommonErrorMessage.TOKEN_INVALID);
            }
            const userRepo = typeorm_1.getRepository(user_entity_1.default);
            const userEntity = await userRepo.findOne(userId);
            const validateToken = await jwt.verify(token, process.env.SECRET);
            if (validateToken) {
                userEntity.token = this.oauth2.generateToken(userEntity.username, userEntity.password, userEntity.id, userEntity.roleId);
                const data = userRepo.save(userEntity);
                return new response_1.ResponseData(message_enum_1.CommonMessage.SUCCESS);
            }
            else
                return new response_1.ErrorException(message_enum_1.CommonErrorMessage.TOKEN_INVALID);
        }
        catch (error) {
            return new response_1.ErrorException(error);
        }
    }
    async login(username, password) {
        try {
            if (!username || !password) {
                return new response_1.ErrorException(code_enum_1.CommonCode.NOT_FOUND, code_enum_1.UserErrorCode.NOT_FOUND, message_enum_1.UserErrorMessage.LOGIN_ERROR);
            }
            const userRepo = typeorm_1.getRepository(user_entity_1.default);
            const userEntity = await userRepo.findOne({
                where: { username },
                relations: ['role', 'profile', 'accountType'],
            });
            console.log(userEntity);
            if (!userEntity) {
                return new response_1.ErrorException(message_enum_1.UserErrorMessage.NOT_FOUND, code_enum_1.CommonCode.NOT_FOUND, message_enum_1.CommonMessage.NOT_FOUND);
            }
            else {
                if (userEntity.password === password) {
                    const token = this.oauth2
                        .generateToken(userEntity.username, userEntity.password, userEntity.id, userEntity.role.id, userEntity.accountType.id)
                        .toString();
                    userEntity.token = token;
                    const res = await userRepo.save(userEntity);
                    const { ban, active, id } = res;
                    return new response_1.ResponseData(Object.assign({ token,
                        ban,
                        active,
                        id }, res.profile));
                }
                else {
                    return new response_1.ErrorException(message_enum_1.UserErrorMessage.LOGIN_ERROR, code_enum_1.UserErrorCode.NOT_FOUND, message_enum_1.CommonErrorMessage.NOT_FOUND);
                }
            }
        }
        catch (error) {
            console.log(error);
            return new response_1.ErrorException(error);
        }
    }
    async register(username, password) {
        try {
            if (!username || !password) {
                return new response_1.ErrorException(message_enum_1.CommonErrorMessage.NOT_FOUND, code_enum_1.UserErrorCode.NOT_FOUND, message_enum_1.UserErrorMessage.DATA_REQUIREMENT);
            }
            const userRepo = typeorm_1.getRepository(user_entity_1.default);
            const profileRepo = typeorm_1.getRepository(profile_entity_1.default);
            const roleRepo = typeorm_1.getRepository(role_entity_1.default);
            const accountTypeRepo = typeorm_1.getRepository(account_type_entity_1.default);
            const userEntity = await userRepo.findOne({
                username,
            });
            if (userEntity) {
                return new response_1.ErrorException(message_enum_1.UserErrorMessage.CONFLICT, code_enum_1.CommonCode.CONFLICT, message_enum_1.CommonMessage.CONFLICT);
            }
            else {
                const newUser = new user_entity_1.default(null, username, password, null, 3, null, 0, 0);
                const profileEntity = new profile_entity_1.default(null, username, 0, '_', '_');
                const res0 = await profileRepo.save(profileEntity);
                const res1 = await roleRepo.findOne({ where: { name: 'user' } });
                const res2 = await accountTypeRepo.findOne({
                    where: { name: 'normal' },
                });
                newUser.profile = res0;
                newUser.role = res1;
                newUser.accountType = res2;
                const res = await userRepo.save(newUser);
                return new response_1.ResponseData(res);
            }
        }
        catch (error) {
            return new response_1.ErrorException(error);
        }
    }
    async th3Register(email, accountType, fistName, lastName, avatarUrl, th3Token) {
        try {
            const oauth2 = new oauth2_1.default();
            const userRepo = typeorm_1.getRepository(user_entity_1.default);
            const profilRepo = typeorm_1.getRepository(profile_entity_1.default);
            if (!th3Token && !(await userRepo.findOne({ email }))) {
                return new response_1.ErrorException(message_enum_1.UserErrorMessage.CONFLICT, code_enum_1.CommonCode.CONFLICT, message_enum_1.CommonErrorMessage.CONFLICT);
            }
            else {
                const id = uuid.v1();
                const userEntity = new user_entity_1.default(id, email, null, email, 3, 1);
                const resultEntity = await userRepo.save(userEntity);
                const token = oauth2.generateToken(email, id, resultEntity.id, 3, accountType);
                resultEntity.token = token;
                const profileEntity = new profile_entity_1.default(id, fistName + lastName, 0, avatarUrl);
                const res0 = await profilRepo.save(profileEntity);
                resultEntity.profile = res0;
                const data = await userRepo.save(resultEntity);
                return new response_1.ResponseData(data);
            }
        }
        catch (error) {
            return new response_1.ErrorException(error);
        }
    }
    async th3Login(email, token, accountType) {
        try {
            const oauth2 = new oauth2_1.default();
            const userRepo = typeorm_1.getRepository(user_entity_1.default);
            if (!email || !token || accountType) {
                return new response_1.ErrorException(message_enum_1.CommonErrorMessage.REQUEST_BODY_ERR);
            }
            else {
                const userEntity = await userRepo.findOne({ email });
                if (token &&
                    userEntity &&
                    userEntity.token === token &&
                    userEntity.accountType.id !== accountType) {
                    const profile = userEntity.profile;
                    return new response_1.ResponseData(profile);
                }
                else {
                    return new response_1.ErrorException(code_enum_1.TokenErrorCode.INVALID);
                }
            }
        }
        catch (error) {
            return new response_1.ErrorException(error);
        }
    }
    async validateToken(id, token) {
        try {
            if (!id || !token) {
                return new response_1.ErrorException(code_enum_1.CommonCode.NOT_FOUND, code_enum_1.UserErrorCode.NOT_FOUND, message_enum_1.CommonErrorMessage.TOKEN_INVALID);
            }
            else {
                const userRepo = typeorm_1.getRepository(user_entity_1.default);
                const userEntity = await userRepo.findOne(id);
                if (token === userEntity.token) {
                    return new response_1.ResponseData(userEntity);
                }
                return new response_1.ErrorException(code_enum_1.TokenErrorCode.INVALID, code_enum_1.CommonCode.NOT_FOUND, message_enum_1.CommonErrorMessage.TOKEN_INVALID);
            }
        }
        catch (error) {
            return new response_1.ErrorException(error);
        }
    }
    async validate(token, path) {
        try {
            if (!token) {
                return new response_1.ErrorException(code_enum_1.CommonCode.NOT_FOUND, code_enum_1.UserErrorCode.NOT_FOUND, message_enum_1.CommonErrorMessage.TOKEN_INVALID);
            }
            else {
                const decoded = await jwt.verify(String(token), process.env.SECRET);
                //@ts-ignore
                const { id, roleId } = decoded;
                const userRepo = typeorm_1.getRepository(user_entity_1.default);
                const userEntity = await userRepo.findOne(id);
                if (!decoded || token !== userEntity.token) {
                    return new response_1.ErrorException(message_enum_1.CommonErrorMessage.TOKEN_INVALID, code_enum_1.TokenErrorCode.INVALID);
                }
                else {
                    const apiRepo = typeorm_1.getRepository(api_entity_1.default);
                    const apiEntity = await apiRepo.findOne({
                        where: { path },
                        relations: ['roles'],
                    });
                    console.log(apiEntity);
                    const listId = apiEntity.roles.map((role) => role.id);
                    if (!apiEntity ||
                        !roleId ||
                        listId.length === 0 ||
                        !listId.includes(roleId)) {
                        return new response_1.ErrorException('Role invalid', code_enum_1.CommonCode.NOT_FOUND);
                    }
                    else
                        return new response_1.ResponseData(message_enum_1.CommonMessage.SUCCESS);
                }
            }
        }
        catch (error) {
            return new response_1.ErrorException(error);
        }
    }
    async validateRole(path, roleId) {
        try {
            console.log(path);
            return new response_1.ErrorException('Role is failure', code_enum_1.TokenErrorCode.INVALID);
        }
        catch (error) {
            return new response_1.ErrorException(error);
        }
    }
}
exports.default = Oauth2Service;
