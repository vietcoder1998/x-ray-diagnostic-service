"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ip = exports.getHostName = void 0;
const os = require('os');
function getHostName() {
    const hostname = os.hostname();
    return hostname;
}
exports.getHostName = getHostName;
exports.ip = (function getIp() {
    const nw = os.networkInterfaces();
    if (nw && nw.lo0 && nw.en0) {
        const address1 = nw.lo0[0].address;
        const address2 = nw.en0[1].address;
        return [address1, address2];
    }
    else
        return ['localhost', 'localhost'];
})()[0];
