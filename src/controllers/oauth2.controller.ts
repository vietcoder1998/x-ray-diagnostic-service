import { NextFunction } from 'express'
import BaseController from '../base/controller'
import { CommonCode } from '../enums/code.enum'
import { Req, Res } from '../interfaces'
import Oauth2Service from '../services/oauth2.services'

export default class Oauth2Controller extends BaseController {
    constructor() {
        super()
    }

    listen() {
        this.router.post(
            '/register',
            (req: Req, res: Res, next: NextFunction) => {
                try {
                    const oauth2Service = new Oauth2Service()
                    const user = req.body
                    oauth2Service
                        .register(user.username, user.password)
                        .then((data) => {
                            res.status(data.subCode).send(data)
                        })
                } catch (err) {
                    res.status(CommonCode.UNKNOWN).send(err)
                }
            }
        )

        this.router.post('/login', (req: Req, res: Res, next: NextFunction) => {
            try {
                const oauth2 = new Oauth2Service()
                const user = req.body
                oauth2
                    .login(String(user.username), String(user.password))
                    .then((data) => {
                        res.status(data.subCode).send(data)
                    })
            } catch (err) {
                res.status(CommonCode.UNKNOWN).send(err)
            }
        })

        this.router.post(
            '/logout/:userId',
            (req: Req, res: Res, next: NextFunction) => {
                try {
                    const oauth2Service = new Oauth2Service()
                    const token = String(req.headers['token'])
                    const { userId } = req.params

                    oauth2Service
                        .logout(parseInt(userId), token)
                        .then((data) => {
                            res.status(data.subCode).send(data)
                        })
                } catch (err) {
                    res.status(CommonCode.UNKNOWN).send(err)
                }
            }
        )

        this.router.post(
            '/logout/:userId',
            (req: Req, res: Res, next: NextFunction) => {
                try {
                    const oauth2Service = new Oauth2Service()
                    const token = String(req.headers['token'])
                    const { userId } = req.params

                    oauth2Service
                        .logout(parseInt(userId), token)
                        .then((data) => {
                            res.status(data.subCode).send(data)
                        })
                } catch (err) {
                    res.status(CommonCode.UNKNOWN).send(err)
                }
            }
        )

        this.router.post(
            '/th3/login',
            (req: Req, res: Res, next: NextFunction) => {
                try {
                    const oauth2Service = new Oauth2Service()
                    const { email, token, accountType } = req.body

                    oauth2Service
                        .th3Login(email, token, accountType)
                        .then((data) => {
                            res.status(data.subCode).send(data)
                        })
                } catch (err) {
                    res.status(CommonCode.UNKNOWN).send(err)
                }
            }
        )

        this.router.post(
            '/th3/register',
            (req: Req, res: Res, next: NextFunction) => {
                try {
                    const oauth2Service = new Oauth2Service()
                    const {
                        email,
                        accountType,
                        firstName,
                        lastName,
                        avatarUrl,
                        token,
                    } = req.body

                    oauth2Service
                        .th3Register(
                            email,
                            accountType,
                            firstName,
                            lastName,
                            avatarUrl,
                            token
                        )
                        .then((data) => {
                            res.status(data.subCode).send(data)
                        })
                } catch (err) {
                    res.status(CommonCode.UNKNOWN).send(err)
                }
            }
        )
    }
}
