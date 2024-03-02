"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonCode = exports.RoomErrorCode = exports.UserErrorCode = exports.OnlineUserErrorCode = exports.TokenErrorCode = void 0;
var TokenErrorCode;
(function (TokenErrorCode) {
    TokenErrorCode[TokenErrorCode["INVALID"] = 40400] = "INVALID";
    TokenErrorCode[TokenErrorCode["EXPIRED"] = 40401] = "EXPIRED";
})(TokenErrorCode = exports.TokenErrorCode || (exports.TokenErrorCode = {}));
var OnlineUserErrorCode;
(function (OnlineUserErrorCode) {
    OnlineUserErrorCode[OnlineUserErrorCode["INVALID"] = 40400] = "INVALID";
    OnlineUserErrorCode[OnlineUserErrorCode["EXPIRED"] = 40401] = "EXPIRED";
})(OnlineUserErrorCode = exports.OnlineUserErrorCode || (exports.OnlineUserErrorCode = {}));
var UserErrorCode;
(function (UserErrorCode) {
    UserErrorCode[UserErrorCode["NOT_FOUND"] = 40431] = "NOT_FOUND";
    UserErrorCode[UserErrorCode["CONFLICT"] = 40932] = "CONFLICT";
    UserErrorCode[UserErrorCode["NO_ID"] = 40433] = "NO_ID";
    UserErrorCode[UserErrorCode["RQ_BODY_FAIL"] = 40434] = "RQ_BODY_FAIL";
})(UserErrorCode = exports.UserErrorCode || (exports.UserErrorCode = {}));
var RoomErrorCode;
(function (RoomErrorCode) {
    RoomErrorCode[RoomErrorCode["NOT_FOUND"] = 40421] = "NOT_FOUND";
    RoomErrorCode[RoomErrorCode["CONFLICT"] = 40922] = "CONFLICT";
    RoomErrorCode[RoomErrorCode["NO_ID"] = 40423] = "NO_ID";
    RoomErrorCode[RoomErrorCode["RQ_BODY_FAIL"] = 40424] = "RQ_BODY_FAIL";
    RoomErrorCode[RoomErrorCode["FULL"] = 40425] = "FULL";
    RoomErrorCode[RoomErrorCode["IN_ROOM"] = 40426] = "IN_ROOM";
    RoomErrorCode[RoomErrorCode["OUT_ROOM"] = 40427] = "OUT_ROOM";
})(RoomErrorCode = exports.RoomErrorCode || (exports.RoomErrorCode = {}));
var CommonCode;
(function (CommonCode) {
    CommonCode[CommonCode["SUCCESS"] = 200] = "SUCCESS";
    CommonCode[CommonCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    CommonCode[CommonCode["CONFLICT"] = 409] = "CONFLICT";
    CommonCode[CommonCode["UNKNOWN"] = 500] = "UNKNOWN";
    CommonCode[CommonCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
})(CommonCode = exports.CommonCode || (exports.CommonCode = {}));
