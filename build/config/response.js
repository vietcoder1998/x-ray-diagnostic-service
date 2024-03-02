"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EgoResponse = exports.ResponseData = exports.ErrorException = void 0;
const code_enum_1 = require("../enums/code.enum");
const message_enum_1 = require("./../enums/message.enum");
class ErrorException {
    constructor(data, code, msg) {
        this.code = 500;
        this.msg = message_enum_1.CommonMessage.UNKNOWN;
        this.subCode = 500;
        this.code = code || code_enum_1.CommonCode.UNKNOWN;
        this.data = data || message_enum_1.CommonMessage.UNKNOWN;
        this.msg = msg || message_enum_1.CommonMessage.ERROR;
        if (this.code) {
            const code = this.code.toString();
            const subCode = code.substr(0, 3);
            this.subCode = parseInt(subCode);
        }
    }
}
exports.ErrorException = ErrorException;
class ResponseData {
    constructor(data, pi, ps, total, msg, code) {
        this.code = 200;
        this.msg = message_enum_1.CommonMessage.SUCCESS;
        this.pi = 0;
        this.ps = 0;
        this.total = 0;
        this.subCode = 200;
        this.data = data;
        this.code = code || 200;
        this.msg = msg || message_enum_1.CommonMessage.SUCCESS;
        this.pi = pi || 0;
        this.ps = ps || 0;
        this.total = total || 0;
        this.data = data;
        if (this.code) {
            const code = this.code.toString();
            const subCode = code.substr(0, 3);
            this.subCode = parseInt(subCode);
        }
    }
}
exports.ResponseData = ResponseData;
class EgoResponse {
    constructor(status, error_code, message, data) {
        this.status = status;
        this.error_code = error_code;
        this.message = message;
        this.data = data;
    }
}
exports.EgoResponse = EgoResponse;
