"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("uuid");
class ProfileDto {
    constructor(id, name, state, avatarUrl, coverUrl) {
        this.id = id || uuid.v1();
        this.name = name;
        this.state = state;
        this.avatarUrl = avatarUrl;
        this.coverUrl = coverUrl;
        this.createdDate = new Date().getTime();
    }
}
exports.default = ProfileDto;
