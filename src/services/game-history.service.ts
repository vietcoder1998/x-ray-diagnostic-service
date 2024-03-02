import { getRepository } from 'typeorm'
import BaseService from '../base/services'
import { ErrorException, ResponseData } from '../config/response'
import GameHistoryDto from '../dto/game-history.dto'
import GameHistoryEntity from '../entities/game-history.entity'
import { CommonCode } from '../enums/code.enum'
import { GameHistoryErrorMessage } from '../enums/message.enum'
import { PromiseRepository } from '../interfaces'

export default class GameHistoryService extends BaseService {
    public async get(gameHistoryId?: string): PromiseRepository {
        try {
            const gameHistoryRepository = getRepository(GameHistoryEntity)
            const res = await gameHistoryRepository.findOne(gameHistoryId, {
                relations: ['game'],
            })

            if (!res) {
                return new ErrorException(
                    GameHistoryErrorMessage.NOT_FOUND,
                    CommonCode.NOT_FOUND
                )
            }

            if (!gameHistoryId) {
                return new ErrorException(
                    GameHistoryErrorMessage.NO_ID,
                    CommonCode.NOT_FOUND
                )
            }

            return new ResponseData(res)
        } catch (err) {
            return new ErrorException(err)
        }
    }

    public async create(gameHistory: GameHistoryDto): PromiseRepository {
        try {
            const gameHistoryRepository = getRepository(GameHistoryEntity)
            let gameHistoryEntity = new GameHistoryEntity(
                null,
                gameHistory.ownerId,
                gameHistory.state,
                gameHistory.data,
                gameHistory.roomId,
                gameHistory.gold,
                gameHistory.diamond,
                gameHistory.createdDate
            )

            const res = await gameHistoryRepository.save(gameHistoryEntity)
            return new ResponseData(res)
        } catch (error) {
            return new ErrorException(error)
        }
    }

    public async update(
        gameHistoryId?: string,
        gameHistory?: GameHistoryDto
    ): PromiseRepository {
        try {
            const gameHistoryRepository = getRepository(GameHistoryEntity)
            let gameHistoryEntity = await gameHistoryRepository.findOne(
                gameHistoryId
            )

            if (gameHistoryEntity) {
                gameHistoryEntity = { ...gameHistoryEntity, ...gameHistory }
            }

            const res = await gameHistoryRepository.update(
                gameHistoryId,
                gameHistoryEntity
            )
            return new ResponseData(res)
        } catch (error) {
            return new ErrorException(error)
        }
    }

    public async delete(gameHistoryId?: string) {
        try {
            const res = await getRepository(GameHistoryEntity).delete(
                gameHistoryId
            )
            return new ErrorException(res)
        } catch (error) {
            return new ErrorException(error)
        }
    }

    public async getList(page?: number, size?: number): PromiseRepository {
        try {
            const res = await getRepository(GameHistoryEntity).findAndCount({
                skip: page || 0,
                take: size || 0,
                relations: ['profile'],
            })

            return new ResponseData(res[0], page, size, res[1])
        } catch (error) {
            return new ErrorException(error)
        }
    }

    public async deleteMany(gameHistoryIds?: string[]) {
        try {
            const res = await getRepository(GameHistoryEntity).delete(
                gameHistoryIds
            )
            return new ErrorException(res)
        } catch (error) {
            return new ErrorException(error)
        }
    }
}
