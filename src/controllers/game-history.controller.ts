import { NextFunction } from 'express'
import BaseController from '../base/controller'
import { CommonCode } from '../enums/code.enum'
import { Req, Res } from '../interfaces'
import GameHistoryService from '../services/game-history.service'

export default class GameHistoryController extends BaseController {
    listen() {
        this.router.get(
            '/:id',
            this.oauth2.guard,
            (req: Req, res: Res, next: NextFunction) => {
                try {
                    const { id } = req.params
                    const gameHistoryService = new GameHistoryService()

                    if (id === 'list') {
                        gameHistoryService.getList().then((data) => {
                            res.status(data.subCode).send(data)
                        })
                    } else {
                        gameHistoryService.get(id).then((data) => {
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
                    const gameHistoryService = new GameHistoryService()
                    gameHistoryService.delete(id).then((data) => {
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
                    const user = req.body
                    const gameHistoryService = new GameHistoryService()
                    gameHistoryService.create(user).then((data) => {
                        res.status(data.subCode).send(data)
                    })
                } catch (error) {
                    res.status(CommonCode.UNKNOWN).send(error)
                }
            }
        )
    }
}
