"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("../base/controller");
const code_enum_1 = require("../enums/code.enum");
const role_service_1 = require("../services/role.service");
class RoleController extends controller_1.default {
    listen() {
        this.router.get('/:roleId', this.oauth2.guard, (req, res, next) => {
            try {
                const { roleId } = req.params;
                console.log(roleId);
                const roleService = new role_service_1.default();
                if (roleId !== 'list') {
                    roleService.get(roleId).then((data) => {
                        res.status(data.subCode).send(data);
                    });
                }
                else {
                    const { page, size } = req.query;
                    roleService
                        .getList(parseInt(String(page)), parseInt(String(size)))
                        .then((data) => {
                        res.status(data.subCode).send(data);
                    });
                }
            }
            catch (error) {
                res.status(code_enum_1.CommonCode.UNKNOWN).send(error);
            }
        });
        this.router.delete('/:roleId', this.oauth2.guard, (req, res, next) => {
            try {
                const { id } = req.params;
                const roleService = new role_service_1.default();
                roleService.delete(id).then((data) => {
                    res.status(data.subCode).send(data);
                });
            }
            catch (error) {
                res.status(code_enum_1.CommonCode.UNKNOWN).send(error);
            }
        });
        this.router.post('/create', this.oauth2.guard, (req, res, next) => {
            try {
                const role = req.body;
                const roleService = new role_service_1.default();
                roleService.create(role).then((data) => {
                    res.status(data.subCode).send(data);
                });
            }
            catch (error) {
                res.status(code_enum_1.CommonCode.UNKNOWN).send(error);
            }
        });
    }
}
exports.default = RoleController;
