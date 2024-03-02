import * as jwt from 'jsonwebtoken'
import * as uuid from 'uuid'
import { getRepository } from 'typeorm'
import { ErrorException, ResponseData } from '../config/response'
import ApiEntity from '../entities/api.entity'
import ProfileEntity from '../entities/profile.entity'
import UserEntity from '../entities/user.entity'
import { CommonCode, TokenErrorCode, UserErrorCode } from '../enums/code.enum'
import {
    CommonErrorMessage,
    CommonMessage,
    RoleErrorMessage,
    UserErrorMessage,
} from '../enums/message.enum'
import { PromiseRepository } from '../interfaces'
import Oauth2 from '../oauth2'
import RoleEntity from '../entities/role.entity'
import AccountTypeEntity from '../entities/account-type.entity'

export default class Oauth2Service {
    oauth2: Oauth2 = new Oauth2()
    async logout(userId: number, token: string): PromiseRepository {
        try {
            if (!userId) {
                return new ErrorException(
                    CommonErrorMessage.NOT_FOUND,
                    UserErrorCode.NOT_FOUND,
                    UserErrorMessage.NO_ID
                )
            }

            if (!token) {
                return new ErrorException(
                    CommonErrorMessage.TOKEN_INVALID,
                    TokenErrorCode.INVALID,
                    CommonErrorMessage.TOKEN_INVALID
                )
            }

            const userRepo = getRepository(UserEntity)
            const userEntity = await userRepo.findOne(userId)

            const validateToken = await jwt.verify(token, process.env.SECRET)
            if (validateToken) {
                userEntity.token = this.oauth2.generateToken(
                    userEntity.username,
                    userEntity.password,
                    userEntity.id,
                    userEntity.roleId
                )

                const data = userRepo.save(userEntity)

                return new ResponseData(CommonMessage.SUCCESS)
            } else return new ErrorException(CommonErrorMessage.TOKEN_INVALID)
        } catch (error) {
            return new ErrorException(error)
        }
    }

    async login(username: string, password: string) {
        try {
            if (!username || !password) {
                return new ErrorException(
                    CommonCode.NOT_FOUND,
                    UserErrorCode.NOT_FOUND,
                    UserErrorMessage.LOGIN_ERROR
                )
            }

            const userRepo = getRepository(UserEntity)
            const userEntity = await userRepo.findOne({
                where: { username },
                relations: ['role', 'profile', 'accountType'],
            })

            console.log(userEntity)
            if (!userEntity) {
                return new ErrorException(
                    UserErrorMessage.NOT_FOUND,
                    CommonCode.NOT_FOUND,
                    CommonMessage.NOT_FOUND
                )
            } else {
                if (userEntity.password === password) {
                    const token = this.oauth2
                        .generateToken(
                            userEntity.username,
                            userEntity.password,
                            userEntity.id,
                            userEntity.role.id,
                            userEntity.accountType.id
                        )
                        .toString()
                    userEntity.token = token
                    const res = await userRepo.save(userEntity)
                    const { ban, active, id } = res

                    return new ResponseData({
                        token,
                        ban,
                        active,
                        id,
                        ...res.profile,
                    })
                } else {
                    return new ErrorException(
                        UserErrorMessage.LOGIN_ERROR,
                        UserErrorCode.NOT_FOUND,
                        CommonErrorMessage.NOT_FOUND
                    )
                }
            }
        } catch (error) {
            console.log(error)
            return new ErrorException(error)
        }
    }

    async register(username?: string, password?: string) {
        try {
            if (!username || !password) {
                return new ErrorException(
                    CommonErrorMessage.NOT_FOUND,
                    UserErrorCode.NOT_FOUND,
                    UserErrorMessage.DATA_REQUIREMENT
                )
            }

            const userRepo = getRepository(UserEntity)
            const profileRepo = getRepository(ProfileEntity)
            const roleRepo = getRepository(RoleEntity)
            const accountTypeRepo = getRepository(AccountTypeEntity)

            const userEntity = await userRepo.findOne({
                username,
            })

            if (userEntity) {
                return new ErrorException(
                    UserErrorMessage.CONFLICT,
                    CommonCode.CONFLICT,
                    CommonMessage.CONFLICT
                )
            } else {
                const newUser = new UserEntity(
                    null,
                    username,
                    password,
                    null,
                    3,
                    null,
                    0,
                    0
                )

                const profileEntity = new ProfileEntity(
                    null,
                    username,
                    0,
                    '_',
                    '_'
                )
                const res0 = await profileRepo.save(profileEntity)
                const res1 = await roleRepo.findOne({ where: { name: 'user' } })
                const res2 = await accountTypeRepo.findOne({
                    where: { name: 'normal' },
                })
                newUser.profile = res0
                newUser.role = res1
                newUser.accountType = res2

                const res = await userRepo.save(newUser)
                return new ResponseData(res)
            }
        } catch (error) {
            return new ErrorException(error)
        }
    }

    async th3Register(
        email: string,
        accountType?: number,
        fistName?: string,
        lastName?: string,
        avatarUrl?: string,
        th3Token?: string
    ) {
        try {
            const oauth2 = new Oauth2()
            const userRepo = getRepository(UserEntity)
            const profilRepo = getRepository(ProfileEntity)

            if (!th3Token && !(await userRepo.findOne({ email }))) {
                return new ErrorException(
                    UserErrorMessage.CONFLICT,
                    CommonCode.CONFLICT,
                    CommonErrorMessage.CONFLICT
                )
            } else {
                const id = uuid.v1()
                const userEntity = new UserEntity(id, email, null, email, 3, 1)

                const resultEntity = await userRepo.save(userEntity)
                const token = oauth2.generateToken(
                    email,
                    id,
                    resultEntity.id,
                    3,
                    accountType
                )

                resultEntity.token = token
                const profileEntity = new ProfileEntity(
                    id,
                    fistName + lastName,
                    0,
                    avatarUrl
                )

                const res0 = await profilRepo.save(profileEntity)
                resultEntity.profile = res0

                const data = await userRepo.save(resultEntity)

                return new ResponseData(data)
            }
        } catch (error) {
            return new ErrorException(error)
        }
    }

    async th3Login(email: string, token: string, accountType: number) {
        try {
            const oauth2 = new Oauth2()
            const userRepo = getRepository(UserEntity)

            if (!email || !token || accountType) {
                return new ErrorException(CommonErrorMessage.REQUEST_BODY_ERR)
            } else {
                const userEntity = await userRepo.findOne({ email })
                if (
                    token &&
                    userEntity &&
                    userEntity.token === token &&
                    userEntity.accountType.id !== accountType
                ) {
                    const profile = userEntity.profile
                    return new ResponseData(profile)
                } else {
                    return new ErrorException(TokenErrorCode.INVALID)
                }
            }
        } catch (error) {
            return new ErrorException(error)
        }
    }

    async validateToken(id: number, token: string) {
        try {
            if (!id || !token) {
                return new ErrorException(
                    CommonCode.NOT_FOUND,
                    UserErrorCode.NOT_FOUND,
                    CommonErrorMessage.TOKEN_INVALID
                )
            } else {
                const userRepo = getRepository(UserEntity)
                const userEntity = await userRepo.findOne(id)
                if (token === userEntity.token) {
                    return new ResponseData(userEntity)
                }
                return new ErrorException(
                    TokenErrorCode.INVALID,
                    CommonCode.NOT_FOUND,
                    CommonErrorMessage.TOKEN_INVALID
                )
            }
        } catch (error) {
            return new ErrorException(error)
        }
    }

    async validate(token: string, path: string) {
        try {
            if (!token) {
                return new ErrorException(
                    CommonCode.NOT_FOUND,
                    UserErrorCode.NOT_FOUND,
                    CommonErrorMessage.TOKEN_INVALID
                )
            } else {
                const decoded = await jwt.verify(
                    String(token),
                    process.env.SECRET
                )

                //@ts-ignore
                const { id, roleId } = decoded
                const userRepo = getRepository(UserEntity)
                const userEntity = await userRepo.findOne(id)

                if (!decoded || token !== userEntity.token) {
                    return new ErrorException(
                        CommonErrorMessage.TOKEN_INVALID,
                        TokenErrorCode.INVALID
                    )
                } else {
                    const apiRepo = getRepository(ApiEntity)
                    const apiEntity = await apiRepo.findOne({
                        where: { path },
                        relations: ['roles'],
                    })

                    console.log(apiEntity)

                    const listId = apiEntity.roles.map((role) => role.id)

                    if (
                        !apiEntity ||
                        !roleId ||
                        listId.length === 0 ||
                        !listId.includes(roleId)
                    ) {
                        return new ErrorException(
                            'Role invalid',
                            CommonCode.NOT_FOUND
                        )
                    } else return new ResponseData(CommonMessage.SUCCESS)
                }
            }
        } catch (error) {
            return new ErrorException(error)
        }
    }

    async validateRole(path: string, roleId: number) {
        try {
            console.log(path)

            return new ErrorException('Role is failure', TokenErrorCode.INVALID)
        } catch (error) {
            return new ErrorException(error)
        }
    }
}
