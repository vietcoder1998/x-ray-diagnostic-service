"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function rand(max, min) {
    let mi = min;
    if (!mi) {
        mi = 0;
    }
    return Math.floor(Math.random() * (max - mi) + mi);
}
exports.default = rand;
