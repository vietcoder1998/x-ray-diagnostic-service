import { NextFunction } from 'express'
import BaseController from '../base/controller'
import { CommonCode } from '../enums/code.enum'
import { Req, Res } from '../interfaces'
import ApiService from '../services/api.service'

export default class ApiController extends BaseController {
    listen() {
        this.router.get(
            '/:apiId',
            this.oauth2.guard,
            (req: Req, res: Res, next: NextFunction) => {
                try {
                    const { apiId } = req.params
                    const apiService = new ApiService()

                    if (apiId === 'list') {
                        const { page, size } = req.query
                        apiService
                            .getList(
                                parseInt(String(page), parseInt(String(size)))
                            )
                            .then((data) => {
                                res.status(data.subCode).send(data)
                            })
                    } else {
                        apiService.get(apiId).then((data) => {
                            res.status(data.subCode).send(data)
                        })
                    }
                } catch (error) {
                    res.status(CommonCode.UNKNOWN).send(error)
                }
            }
        )
        this.router.delete(
            '/:apiId',
            this.oauth2.guard,
            (req: Req, res: Res, next: NextFunction) => {
                try {
                    const { apiId } = req.params
                    const apiService = new ApiService()
                    apiService.delete(apiId).then((data) => {
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
                    const { path, description, roleIds, moduleId, methodId } =
                        req.body
                    const apiService = new ApiService()
                    apiService
                        .create(
                            { path, description },
                            moduleId,
                            methodId,
                            roleIds
                        )
                        .then((data) => {
                            res.status(data.subCode).send(data)
                        })
                } catch (error) {
                    res.status(CommonCode.UNKNOWN).send(error)
                }
            }
        )

        this.router.put(
            '/:apiId/update/role',
            this.oauth2.guard,
            (req: Req, res: Res, next: NextFunction) => {
                try {
                    const roleIds = req.body
                    const { apiId } = req.params
                    const apiService = new ApiService()
                    apiService
                        .updateApiWithRole(apiId, roleIds)
                        .then((data) => {
                            res.status(data.subCode).send(data)
                        })
                } catch (error) {
                    res.status(CommonCode.UNKNOWN).send(error)
                }
            }
        )
    }
}
