"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("uuid");
class UserDto {
    constructor(id, username, password, email, roleId, accountTypeId, gold, diamond, ban, token) {
        this.id = id || uuid.v1();
        this.username = username;
        this.password = password;
        this.email = email;
        this.token = token;
        this.roleId = roleId;
        this.accountTypeId = accountTypeId;
        this.ban = ban || 0;
        this.gold = gold;
        this.diamond = diamond;
    }
}
exports.default = UserDto;
