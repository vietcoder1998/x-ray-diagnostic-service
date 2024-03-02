import { NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import { ErrorException, ResponseData } from '../config/response'
import { CommonCode, TokenErrorCode } from '../enums/code.enum'
import { CommonErrorMessage, CommonMessage } from '../enums/message.enum'
import { Req, Res } from '../interfaces'
import Oauth2Service from '../services/oauth2.services'

export default class Oauth2 {
    generateToken(
        username: string,
        password: string,
        id: string,
        roleId: number,
        type?: number
    ): string {
        const time = new Date().getTime().toString()
        const token = jwt.sign(
            { username, password, id, time, roleId, type },
            process.env.SECRET
        )
        return token
    }

    async guard(req: Req, res: Res, next: NextFunction): Promise<any> {
        try {
            const token = req.headers['token']

            if (!token) {
                res.status(404).send(
                    new ErrorException(
                        CommonErrorMessage.TOKEN_INVALID,
                        TokenErrorCode.INVALID,
                        CommonMessage.TOKEN_INVALID
                    )
                )
            } else {
                const oauth2Service = new Oauth2Service()
                oauth2Service
                    //@ts-ignore
                    .validate(String(token), req.baseUrl + req.route.path)
                    .then((data: ResponseData) => {
                        if (data.subCode !== CommonCode.SUCCESS) {
                            res.status(data.subCode).send(data)
                        } else {
                            next()
                        }
                    })
            }
        } catch (err) {
            console.log(err)
            res.status(500).send(new ErrorException(err))
        }
    }
}
