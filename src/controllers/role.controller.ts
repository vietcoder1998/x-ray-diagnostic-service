import { NextFunction } from 'express'
import BaseController from '../base/controller'
import { ResponseData } from '../config/response'
import { CommonCode } from '../enums/code.enum'
import { Req, Res } from '../interfaces'
import RoleService from '../services/role.service'

export default class RoleController extends BaseController {
    listen() {
        this.router.get(
            '/:roleId',
            this.oauth2.guard,
            (req: Req, res: Res, next: NextFunction) => {
                try {
                    const { roleId } = req.params
                    console.log(roleId)
                    const roleService = new RoleService()

                    if (roleId !== 'list') {
                        roleService.get(roleId).then((data: ResponseData) => {
                            res.status(data.subCode).send(data)
                        })
                    } else {
                        const { page, size } = req.query
                        roleService
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
        this.router.delete(
            '/:roleId',
            this.oauth2.guard,
            (req: Req, res: Res, next: NextFunction) => {
                try {
                    const { id } = req.params
                    const roleService = new RoleService()
                    roleService.delete(id).then((data) => {
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
                    const role = req.body
                    const roleService = new RoleService()
                    roleService.create(role).then((data) => {
                        res.status(data.subCode).send(data)
                    })
                } catch (error) {
                    res.status(CommonCode.UNKNOWN).send(error)
                }
            }
        )
    }
}
