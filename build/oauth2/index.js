"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const response_1 = require("../config/response");
const code_enum_1 = require("../enums/code.enum");
const message_enum_1 = require("../enums/message.enum");
const oauth2_services_1 = require("../services/oauth2.services");
class Oauth2 {
    generateToken(username, password, id, roleId, type) {
        const time = new Date().getTime().toString();
        const token = jwt.sign({ username, password, id, time, roleId, type }, process.env.SECRET);
        return token;
    }
    async guard(req, res, next) {
        try {
            const token = req.headers['token'];
            if (!token) {
                res.status(404).send(new response_1.ErrorException(message_enum_1.CommonErrorMessage.TOKEN_INVALID, code_enum_1.TokenErrorCode.INVALID, message_enum_1.CommonMessage.TOKEN_INVALID));
            }
            else {
                const oauth2Service = new oauth2_services_1.default();
                oauth2Service
                    //@ts-ignore
                    .validate(String(token), req.baseUrl + req.route.path)
                    .then((data) => {
                    if (data.subCode !== code_enum_1.CommonCode.SUCCESS) {
                        res.status(data.subCode).send(data);
                    }
                    else {
                        next();
                    }
                });
            }
        }
        catch (err) {
            console.log(err);
            res.status(500).send(new response_1.ErrorException(err));
        }
    }
}
exports.default = Oauth2;
