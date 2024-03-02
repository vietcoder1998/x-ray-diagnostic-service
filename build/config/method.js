"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function LoadingCmd(mes) {
    const msg = new Date() + (mes ? mes : ' Connecting ...');
    // eslint-disable-next-line no-console
    console.log(`\x1b[36m${msg}`);
}
exports.default = LoadingCmd;
