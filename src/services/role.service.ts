import { getRepository } from 'typeorm'
import BaseService from '../base/services'
import { ErrorException, ResponseData } from '../config/response'
import RoleDto from '../dto/role.dto'
import RoleEntity from '../entities/role.entity'
import { CommonCode } from '../enums/code.enum'
import { RoleErrorMessage } from '../enums/message.enum'
import { PromiseRepository } from '../interfaces'

export default class RoleService extends BaseService {
    public async get(roleId?: string): PromiseRepository {
        try {
            const roleRepository = getRepository(RoleEntity)
            const res = await roleRepository.findOne(roleId)

            if (!res) {
                return new ErrorException(
                    RoleErrorMessage.NOT_FOUND,
                    CommonCode.NOT_FOUND
                )
            }

            if (!roleId) {
                return new ErrorException(
                    RoleErrorMessage.NO_ID,
                    CommonCode.NOT_FOUND
                )
            }

            return new ResponseData(res)
        } catch (err) {
            return new ErrorException(err)
        }
    }

    public async create(role: RoleDto): PromiseRepository {
        try {
            const roleRepository = getRepository(RoleEntity)
            let roleEntity = new RoleEntity(null, role.name, role.description)

            const res = await roleRepository.save(roleEntity)
            return new ResponseData(res)
        } catch (error) {
            return new ErrorException(error)
        }
    }

    public async update(roleId?: string, role?: RoleDto): PromiseRepository {
        try {
            const roleRepository = getRepository(RoleEntity)
            let roleEntity = await roleRepository.findOne(roleId)

            if (roleEntity) {
                roleEntity = { ...roleEntity, ...role }
            }

            const res = await roleRepository.update(roleId, roleEntity)
            return new ResponseData(res)
        } catch (error) {
            return new ErrorException(error)
        }
    }

    public async delete(roleId?: string) {
        try {
            const res = await getRepository(RoleEntity).delete(roleId)
            return new ErrorException(res)
        } catch (error) {
            return new ErrorException(error)
        }
    }

    public async getList(page?: number, size?: number): PromiseRepository {
        try {
            const res = await getRepository(RoleEntity).findAndCount({
                skip: page || 0,
                take: size || 0,
            })

            console.log(res)

            return new ResponseData(res[0], page, size, res[1])
        } catch (error) {
            return new ErrorException(error)
        }
    }

    public async deleteMany(roleIds?: string[]) {
        try {
            const res = await getRepository(RoleEntity).delete(roleIds)
            return new ErrorException(res)
        } catch (error) {
            return new ErrorException(error)
        }
    }
}
