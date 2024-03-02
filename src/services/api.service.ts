import { getRepository } from 'typeorm'
import BaseService from '../base/services'
import { ErrorException, ResponseData } from '../config/response'
import ApiDto from '../dto/api.dto'
import GameDto from '../dto/api.dto'
import ApiEntity from '../entities/api.entity'
import ModuleEntity from '../entities/module.entity'
import RoleEntity from '../entities/role.entity'
import { CommonCode } from '../enums/code.enum'
import {
    ApiErrorMessage,
    CommonMessage,
    RoleErrorMessage,
} from '../enums/message.enum'
import { PromiseRepository } from '../interfaces'

export default class ApiService extends BaseService {
    public async get(apiId?: string): PromiseRepository {
        try {
            const apiRepository = getRepository(ApiEntity)
            const res = await apiRepository.findOne(apiId)

            if (!res) {
                return new ErrorException(
                    ApiErrorMessage.NOT_FOUND,
                    CommonCode.NOT_FOUND
                )
            }

            if (!apiId) {
                return new ErrorException(
                    ApiErrorMessage.NO_ID,
                    CommonCode.NOT_FOUND
                )
            }

            return new ResponseData(res)
        } catch (err) {
            return new ErrorException(err)
        }
    }

    public async create(
        api: ApiDto,
        moduleId: number,
        methodId: number,
        roleIds: number[]
    ): PromiseRepository {
        try {
            const apiRepo = getRepository(ApiEntity)
            const roleRepo = getRepository(RoleEntity)
            const moduleRepo = getRepository(ModuleEntity)

            if (!api) {
                return new ErrorException(
                    ApiErrorMessage.API_DTO,
                    CommonCode.BAD_REQUEST,
                    CommonMessage.BAD_REQUEST
                )
            }

            if (roleIds) {
                return new ErrorException(
                    ApiErrorMessage.ROLE_IDS,
                    CommonCode.BAD_REQUEST,
                    CommonMessage.BAD_REQUEST
                )
            }

            if (moduleId) {
                return new ErrorException(
                    ApiErrorMessage.RQ_BODY_FAIL,
                    CommonCode.BAD_REQUEST,
                    CommonMessage.BAD_REQUEST
                )
            }

            if (!moduleId) {
                return new ErrorException(
                    ApiErrorMessage.RQ_BODY_FAIL,
                    CommonCode.BAD_REQUEST,
                    CommonMessage.BAD_REQUEST
                )
            }

            const exApi = await apiRepo.findOne({ where: { path: api.path } })

            if (exApi) {
                return new ErrorException(
                    ApiErrorMessage.CONFLICT,
                    CommonCode.CONFLICT,
                    CommonMessage.CONFLICT
                )
            }

            let apiEntity = new ApiEntity(null, api.path, api.description)
            const rolesEntities = await roleRepo.findByIds(roleIds)
            const moduleEntity = await moduleRepo.findOne(moduleId)
            const methodEntity = await moduleRepo.findOne(methodId)

            if (!rolesEntities) {
                return new ErrorException(
                    RoleErrorMessage.NOT_FOUND,
                    CommonCode.NOT_FOUND,
                    CommonMessage.NOT_FOUND
                )
            }

            if (!moduleEntity) {
                return new ErrorException(
                    'Not found',
                    CommonCode.NOT_FOUND,
                    CommonMessage.NOT_FOUND
                )
            }

            if (!methodEntity) {
                return new ErrorException(
                    'Not found',
                    CommonCode.NOT_FOUND,
                    CommonMessage.NOT_FOUND
                )
            }

            apiEntity.method = methodEntity
            apiEntity.module = moduleEntity
            apiEntity.roles = rolesEntities

            const res = await apiRepo.save(apiEntity)
            return new ResponseData(res)
        } catch (error) {
            return new ErrorException(error)
        }
    }

    public async update(apiId?: string, api?: GameDto): PromiseRepository {
        try {
            const apiRepository = getRepository(ApiEntity)
            let apiEntity = await apiRepository.findOne(apiId)

            if (apiEntity) {
                apiEntity = { ...apiEntity, ...api }
            }

            const res = await apiRepository.update(apiId, apiEntity)
            return new ResponseData(res)
        } catch (error) {
            return new ErrorException(error)
        }
    }

    public async updateApiWithRole(
        apiId?: string,
        roleIds?: number[]
    ): PromiseRepository {
        try {
            const apiRepo = getRepository(ApiEntity)
            const roleRepo = getRepository(RoleEntity)
            const apiEntity = await apiRepo.findOne({
                where: { id: parseInt(apiId) },
                relations: ['roles'],
            })

            if (!apiId || !apiEntity) {
                return new ErrorException(
                    ApiErrorMessage.NOT_FOUND,
                    CommonCode.NOT_FOUND,
                    CommonMessage.NOT_FOUND
                )
            }

            const roles = apiEntity.roles
            const addRoles = await roleRepo.findByIds(roleIds)

            if (!addRoles || addRoles.length === 0) {
                return new ErrorException(
                    RoleErrorMessage.NOT_FOUND,
                    CommonCode.NOT_FOUND,
                    CommonMessage.NOT_FOUND
                )
            } else {
                if (!roles || roles.length === 0) {
                    apiEntity.roles = addRoles
                } else {
                    addRoles.forEach((addRole: RoleEntity, i: number) => {
                        if (
                            !roles.map((item) => item.id).includes(addRole.id)
                        ) {
                            roles.push(addRole)
                        }
                    })

                    apiEntity.roles = roles
                }

                const res = await apiRepo.save(apiEntity)

                return new ResponseData(res)
            }
        } catch (error) {
            return new ErrorException(error)
        }
    }

    public async delete(apiId?: string) {
        try {
            const res = await getRepository(ApiEntity).delete(apiId)
            return new ErrorException(res)
        } catch (error) {
            return new ErrorException(error)
        }
    }

    public async getList(page?: number, size?: number): PromiseRepository {
        try {
            const res = await getRepository(ApiEntity).findAndCount({
                skip: page || 0,
                take: size || 0,
                relations: ['roles', 'method'],
            })

            return new ResponseData(res[0], page, size, res[1])
        } catch (error) {
            return new ErrorException(error)
        }
    }

    public async deleteMany(apiIds?: string[]) {
        try {
            const res = await getRepository(ApiEntity).delete(apiIds)
            return new ErrorException(res)
        } catch (error) {
            return new ErrorException(error)
        }
    }
}
