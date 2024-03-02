"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageState = void 0;
var MessageState;
(function (MessageState) {
    MessageState[MessageState["NORMAL"] = 0] = "NORMAL";
    MessageState[MessageState["DELETE"] = -1] = "DELETE";
    MessageState[MessageState["HIDDEN"] = -2] = "HIDDEN";
    MessageState[MessageState["PIN"] = 1] = "PIN";
})(MessageState = exports.MessageState || (exports.MessageState = {}));
