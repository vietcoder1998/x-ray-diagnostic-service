"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const oauth2_1 = require("../../oauth2");
class BaseController {
    constructor() {
        this.oauth2 = new oauth2_1.default();
        this.router = express_1.Router();
        this.listen();
    }
}
exports.default = BaseController;
