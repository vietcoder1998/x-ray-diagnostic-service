"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("../base/controller");
const code_enum_1 = require("../enums/code.enum");
const oauth2_services_1 = require("../services/oauth2.services");
class Oauth2Controller extends controller_1.default {
    constructor() {
        super();
    }
    listen() {
        this.router.post('/register', (req, res, next) => {
            try {
                const oauth2Service = new oauth2_services_1.default();
                const user = req.body;
                oauth2Service
                    .register(user.username, user.password)
                    .then((data) => {
                    res.status(data.subCode).send(data);
                });
            }
            catch (err) {
                res.status(code_enum_1.CommonCode.UNKNOWN).send(err);
            }
        });
        this.router.post('/login', (req, res, next) => {
            try {
                const oauth2 = new oauth2_services_1.default();
                const user = req.body;
                oauth2
                    .login(String(user.username), String(user.password))
                    .then((data) => {
                    res.status(data.subCode).send(data);
                });
            }
            catch (err) {
                res.status(code_enum_1.CommonCode.UNKNOWN).send(err);
            }
        });
        this.router.post('/logout/:userId', (req, res, next) => {
            try {
                const oauth2Service = new oauth2_services_1.default();
                const token = String(req.headers['token']);
                const { userId } = req.params;
                oauth2Service
                    .logout(parseInt(userId), token)
                    .then((data) => {
                    res.status(data.subCode).send(data);
                });
            }
            catch (err) {
                res.status(code_enum_1.CommonCode.UNKNOWN).send(err);
            }
        });
        this.router.post('/logout/:userId', (req, res, next) => {
            try {
                const oauth2Service = new oauth2_services_1.default();
                const token = String(req.headers['token']);
                const { userId } = req.params;
                oauth2Service
                    .logout(parseInt(userId), token)
                    .then((data) => {
                    res.status(data.subCode).send(data);
                });
            }
            catch (err) {
                res.status(code_enum_1.CommonCode.UNKNOWN).send(err);
            }
        });
        this.router.post('/th3/login', (req, res, next) => {
            try {
                const oauth2Service = new oauth2_services_1.default();
                const { email, token, accountType } = req.body;
                oauth2Service
                    .th3Login(email, token, accountType)
                    .then((data) => {
                    res.status(data.subCode).send(data);
                });
            }
            catch (err) {
                res.status(code_enum_1.CommonCode.UNKNOWN).send(err);
            }
        });
        this.router.post('/th3/register', (req, res, next) => {
            try {
                const oauth2Service = new oauth2_services_1.default();
                const { email, accountType, firstName, lastName, avatarUrl, token, } = req.body;
                oauth2Service
                    .th3Register(email, accountType, firstName, lastName, avatarUrl, token)
                    .then((data) => {
                    res.status(data.subCode).send(data);
                });
            }
            catch (err) {
                res.status(code_enum_1.CommonCode.UNKNOWN).send(err);
            }
        });
    }
}
exports.default = Oauth2Controller;
