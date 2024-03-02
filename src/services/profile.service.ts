import { getRepository } from 'typeorm'
import BaseService from '../base/services'
import { ErrorException, ResponseData } from '../config/response'
import Profile from '../dto/profile.dto'
import ProfileEntity from '../entities/profile.entity'
import { CommonCode } from '../enums/code.enum'
import { CommonErrorMessage, ProfileErrorMessage } from '../enums/message.enum'
import { PromiseRepository } from '../interfaces'
import * as uuid from 'uuid'

export default class ProfileService extends BaseService {
    public async get(profileId?: string): PromiseRepository {
        try {
            const profileRespository = getRepository(ProfileEntity)
            const res = await profileRespository.findOne(profileId)

            if (!res) {
                return new ErrorException(
                    ProfileErrorMessage.NOT_FOUND,
                    CommonCode.NOT_FOUND
                )
            }

            if (!profileId) {
                return new ErrorException(
                    ProfileErrorMessage.NO_ID,
                    CommonCode.NOT_FOUND
                )
            }

            return new ResponseData(res)
        } catch (err) {
            return new ErrorException(err)
        }
    }

    public async create(profile: Profile): PromiseRepository {
        try {
            const profileRepository = getRepository(ProfileEntity)
            const profileEntity = new ProfileEntity(uuid.v1())
            const res = await profileRepository.save(profileEntity)
            return new ResponseData(res)
        } catch (error) {
            return new ErrorException(error)
        }
    }

    public async update(
        profileId?: string,
        profile?: Profile
    ): PromiseRepository {
        try {
            const profileRepository = getRepository(ProfileEntity)
            let profileEntity = await profileRepository.findOne(profileId)

            if (profileEntity) {
                profileEntity = { ...profileEntity, ...profile }
            }

            const res = await profileRepository.update(profileId, profileEntity)
            return new ResponseData(res)
        } catch (error) {
            return new ErrorException(error)
        }
    }

    public async delete(profileId?: string) {
        try {
            const res = await getRepository(ProfileEntity).delete(profileId)
            return new ErrorException(res)
        } catch (error) {
            return new ErrorException(error)
        }
    }

    public async getList(page?: number, size?: number): PromiseRepository {
        try {
            const res = await getRepository(ProfileEntity).findAndCount({
                skip: page || 0,
                take: size || 0,
            })

            return new ResponseData(res[0], page, size, res[1])
        } catch (error) {
            return new ErrorException(error)
        }
    }

    public async deleteMany(profileIds?: string[]) {
        try {
            const res = await getRepository(ProfileEntity).delete(profileIds)
            return new ErrorException(res)
        } catch (error) {
            return new ErrorException(error)
        }
    }
}
