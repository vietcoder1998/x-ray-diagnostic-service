import { NextFunction } from 'express'
import BaseController from '../base/controller'
import { CommonCode } from '../enums/code.enum'
import { Req, Res } from '../interfaces'
import GameService from '../services/game.service'

export default class GameController extends BaseController {
    listen() {
        this.router.get(
            '/:gameId',
            this.oauth2.guard,
            (req: Req, res: Res, next: NextFunction) => {
                try {
                    const { gameId } = req.params
                    const { page, size } = req.params
                    const gameService = new GameService()

                    if (gameId === 'list') {
                        gameService
                            .getList(
                                parseInt(String(page)),
                                parseInt(String(size))
                            )
                            .then((data) => {
                                res.status(data.subCode).send(data)
                            })
                    } else {
                        gameService.get(gameId).then((data) => {
                            res.status(data.subCode).send(data)
                        })
                    }
                } catch (error) {
                    res.status(CommonCode.UNKNOWN).send(error)
                }
            }
        )
        this.router.delete(
            '/:id',
            this.oauth2.guard,
            (req: Req, res: Res, next: NextFunction) => {
                try {
                    const { id } = req.params
                    const gameService = new GameService()
                    gameService.delete(id).then((data) => {
                        res.status(data.subCode).send(data)
                    })
                } catch (error) {
                    res.status(CommonCode.UNKNOWN).send(error)
                }
            }
        )
        this.router.post(
            '/create',
            this.oauth2.guard,
            (req: Req, res: Res, next: NextFunction) => {
                try {
                    const game = req.body
                    const gameService = new GameService()
                    gameService.create(game).then((data) => {
                        res.status(data.subCode).send(data)
                    })
                } catch (error) {
                    res.status(CommonCode.UNKNOWN).send(error)
                }
            }
        )
    }
}
