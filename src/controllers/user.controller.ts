import { NextFunction } from 'express'
import BaseController from '../base/controller'
import { ResponseData } from '../config/response'
import { CommonCode } from '../enums/code.enum'
import { Req, Res } from '../interfaces'
import Oauth2 from '../oauth2'
import UserService from '../services/user.service'

export default class UserController extends BaseController {
    listen() {
        this.router.get(
            '/list',
            this.oauth2.guard,
            (req: Req, res: Res, next) => {
                try {
                    if (req.path !== 'list') {
                        const userService = new UserService()
                        const { page, size } = req.query

                        userService
                            .getList(
                                parseInt(String(page)),
                                parseInt(String(size))
                            )
                            .then((data: ResponseData) => {
                                res.status(data.subCode).send(data)
                            })
                    }
                } catch (error) {
                    res.status(CommonCode.UNKNOWN).send(error)
                }
            }
        )
        this.router.get(
            '/:userId',
            this.oauth2.guard,
            (req: Req, res: Res, next: NextFunction) => {
                try {
                    const { userId } = req.params

                    if (userId !== 'list') {
                        const userService = new UserService()
                        userService
                            .get(String(userId))
                            .then((data: ResponseData) => {
                                res.status(data.subCode).send(data)
                            })
                    }
                } catch (error) {
                    res.status(CommonCode.UNKNOWN).send(error)
                }
            }
        )

        this.router.delete(
            '/:userId',
            this.oauth2.guard,
            (req: Req, res: Res, next: NextFunction) => {
                try {
                    const { id } = req.params
                    const userService = new UserService()
                    userService.delete(id).then((data: ResponseData) => {
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
                    console.log(req.body)
                    const userService = new UserService()
                    userService.create(user).then((data: ResponseData) => {
                        console.log(data)
                        res.status(data.subCode).send(data)
                    })
                } catch (error) {
                    res.status(CommonCode.UNKNOWN).send(error)
                }
            }
        )
    }
}
