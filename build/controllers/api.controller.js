"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("../base/controller");
const code_enum_1 = require("../enums/code.enum");
const api_service_1 = require("../services/api.service");
class ApiController extends controller_1.default {
    listen() {
        this.router.get('/:apiId', this.oauth2.guard, (req, res, next) => {
            try {
                const { apiId } = req.params;
                const apiService = new api_service_1.default();
                if (apiId === 'list') {
                    const { page, size } = req.query;
                    apiService
                        .getList(parseInt(String(page), parseInt(String(size))))
                        .then((data) => {
                        res.status(data.subCode).send(data);
                    });
                }
                else {
                    apiService.get(apiId).then((data) => {
                        res.status(data.subCode).send(data);
                    });
                }
            }
            catch (error) {
                res.status(code_enum_1.CommonCode.UNKNOWN).send(error);
            }
        });
        this.router.delete('/:apiId', this.oauth2.guard, (req, res, next) => {
            try {
                const { apiId } = req.params;
                const apiService = new api_service_1.default();
                apiService.delete(apiId).then((data) => {
                    res.status(data.subCode).send(data);
                });
            }
            catch (error) {
                res.status(code_enum_1.CommonCode.UNKNOWN).send(error);
            }
        });
        this.router.post('/create', this.oauth2.guard, (req, res, next) => {
            try {
                const { path, description, roleIds, moduleId, methodId } = req.body;
                const apiService = new api_service_1.default();
                apiService
                    .create({ path, description }, moduleId, methodId, roleIds)
                    .then((data) => {
                    res.status(data.subCode).send(data);
                });
            }
            catch (error) {
                res.status(code_enum_1.CommonCode.UNKNOWN).send(error);
            }
        });
        this.router.put('/:apiId/update/role', this.oauth2.guard, (req, res, next) => {
            try {
                const roleIds = req.body;
                const { apiId } = req.params;
                const apiService = new api_service_1.default();
                apiService
                    .updateApiWithRole(apiId, roleIds)
                    .then((data) => {
                    res.status(data.subCode).send(data);
                });
            }
            catch (error) {
                res.status(code_enum_1.CommonCode.UNKNOWN).send(error);
            }
        });
    }
}
exports.default = ApiController;
