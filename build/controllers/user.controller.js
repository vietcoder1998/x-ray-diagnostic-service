"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("../base/controller");
const code_enum_1 = require("../enums/code.enum");
const user_service_1 = require("../services/user.service");
class UserController extends controller_1.default {
    listen() {
        this.router.get('/list', this.oauth2.guard, (req, res, next) => {
            try {
                if (req.path !== 'list') {
                    const userService = new user_service_1.default();
                    const { page, size } = req.query;
                    userService
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
        this.router.get('/:userId', this.oauth2.guard, (req, res, next) => {
            try {
                const { userId } = req.params;
                if (userId !== 'list') {
                    const userService = new user_service_1.default();
                    userService
                        .get(String(userId))
                        .then((data) => {
                        res.status(data.subCode).send(data);
                    });
                }
            }
            catch (error) {
                res.status(code_enum_1.CommonCode.UNKNOWN).send(error);
            }
        });
        this.router.delete('/:userId', this.oauth2.guard, (req, res, next) => {
            try {
                const { id } = req.params;
                const userService = new user_service_1.default();
                userService.delete(id).then((data) => {
                    res.status(data.subCode).send(data);
                });
            }
            catch (error) {
                res.status(code_enum_1.CommonCode.UNKNOWN).send(error);
            }
        });
        this.router.post('/create', this.oauth2.guard, (req, res, next) => {
            try {
                const user = req.body;
                console.log(req.body);
                const userService = new user_service_1.default();
                userService.create(user).then((data) => {
                    console.log(data);
                    res.status(data.subCode).send(data);
                });
            }
            catch (error) {
                res.status(code_enum_1.CommonCode.UNKNOWN).send(error);
            }
        });
    }
}
exports.default = UserController;
