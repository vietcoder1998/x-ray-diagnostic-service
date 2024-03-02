import { getRepository } from 'typeorm'
import BaseService from '../base/services'
import { ErrorException, ResponseData } from '../config/response'
import GameDto from '../dto/game.dto'
import GameEntity from '../entities/game.entity'
import { CommonCode } from '../enums/code.enum'
import { GameErrorMessage } from '../enums/message.enum'
import { PromiseRepository } from '../interfaces'

export default class GameService extends BaseService {
    public async get(gameId?: string): PromiseRepository {
        try {
            const gameRepository = getRepository(GameEntity)
            const res = await gameRepository.findOne(gameId)

            if (!res) {
                return new ErrorException(
                    GameErrorMessage.NOT_FOUND,
                    CommonCode.NOT_FOUND
                )
            }

            if (!gameId) {
                return new ErrorException(
                    GameErrorMessage.NO_ID,
                    CommonCode.NOT_FOUND
                )
            }

            return new ResponseData(res)
        } catch (err) {
            return new ErrorException(err)
        }
    }

    public async create(game: GameDto): PromiseRepository {
        try {
            const gameRepository = getRepository(GameEntity)
            let gameEntity = new GameEntity(
                null,
                game.name,
                game.description,
                game.ip
            )

            const res = await gameRepository.save(gameEntity)
            return new ResponseData(res)
        } catch (error) {
            return new ErrorException(error)
        }
    }

    public async update(gameId?: string, game?: GameDto): PromiseRepository {
        try {
            const gameRepository = getRepository(GameEntity)
            let gameEntity = await gameRepository.findOne(gameId)

            if (gameEntity) {
                gameEntity = { ...gameEntity, ...game }
            }

            const res = await gameRepository.update(gameId, gameEntity)
            return new ResponseData(res)
        } catch (error) {
            return new ErrorException(error)
        }
    }

    public async delete(gameId?: string) {
        try {
            const res = await getRepository(GameEntity).delete(gameId)
            return new ErrorException(res)
        } catch (error) {
            return new ErrorException(error)
        }
    }

    public async getList(page?: number, size?: number): PromiseRepository {
        try {
            const res = await getRepository(GameEntity).findAndCount({
                skip: page || 0,
                take: size || 0,
            })

            return new ResponseData(res[0], page, size, res[1])
        } catch (error) {
            return new ErrorException(error)
        }
    }

    public async deleteMany(gameIds?: string[]) {
        try {
            const res = await getRepository(GameEntity).delete(gameIds)
            return new ErrorException(res)
        } catch (error) {
            return new ErrorException(error)
        }
    }
}
