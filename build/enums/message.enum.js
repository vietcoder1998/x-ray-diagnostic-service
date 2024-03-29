"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonMessage = exports.RoomErrorMessage = exports.FriendErrorMessage = exports.CommonErrorMessage = exports.ProfileErrorMessage = exports.GameErrorMessage = exports.ApiErrorMessage = exports.RoleErrorMessage = exports.GameHistoryErrorMessage = exports.UserErrorMessage = void 0;
var UserErrorMessage;
(function (UserErrorMessage) {
    UserErrorMessage["NOT_FOUND"] = "User was not founded";
    UserErrorMessage["CONFLICT"] = "User was existed";
    UserErrorMessage["NO_NAME"] = "Username was not founded";
    UserErrorMessage["NO_ID"] = "UserId is requirement";
    UserErrorMessage["RQ_BODY_FAIL"] = "User`s body is invalid";
    UserErrorMessage["DATA_REQUIREMENT"] = "Data is requirement";
    UserErrorMessage["PASS_TOO_SHORT"] = "Password is too short";
    UserErrorMessage["FULL_NAME_REQUIREMENT"] = "Full Name is requirement";
    UserErrorMessage["DESCRIPTION_REQUIREMENT"] = "Description is requirement";
    UserErrorMessage["LOGIN_ERROR"] = "Username or password is not found";
})(UserErrorMessage = exports.UserErrorMessage || (exports.UserErrorMessage = {}));
var GameHistoryErrorMessage;
(function (GameHistoryErrorMessage) {
    GameHistoryErrorMessage["NOT_FOUND"] = "User was not founded";
    GameHistoryErrorMessage["CONFLICT"] = "User was existed";
    GameHistoryErrorMessage["NO_NAME"] = "Username was not founded";
    GameHistoryErrorMessage["NO_ID"] = "GameHistoryId is requirement";
    GameHistoryErrorMessage["RQ_BODY_FAIL"] = "User`s body is invalid";
    GameHistoryErrorMessage["DATA_REQUIREMENT"] = "Data is requirement";
    GameHistoryErrorMessage["PASS_TOO_SHORT"] = "Password is too short";
    GameHistoryErrorMessage["FULL_NAME_REQUIREMENT"] = "Full Name is requirement";
    GameHistoryErrorMessage["DESCRIPTION_REQUIREMENT"] = "Description is requirement";
    GameHistoryErrorMessage["LOGIN_ERROR"] = "Username or password is not found";
})(GameHistoryErrorMessage = exports.GameHistoryErrorMessage || (exports.GameHistoryErrorMessage = {}));
var RoleErrorMessage;
(function (RoleErrorMessage) {
    RoleErrorMessage["NOT_FOUND"] = "Role was not founded";
    RoleErrorMessage["CONFLICT"] = "Role was existed";
    RoleErrorMessage["NO_NAME"] = "Username was not founded";
    RoleErrorMessage["NO_ID"] = "RoleId is requirement";
    RoleErrorMessage["RQ_BODY_FAIL"] = "Role`s body is invalid";
    RoleErrorMessage["DATA_REQUIREMENT"] = "Data is requirement";
    RoleErrorMessage["PASS_TOO_SHORT"] = "Password is too short";
    RoleErrorMessage["FULL_NAME_REQUIREMENT"] = "Full Name is requirement";
    RoleErrorMessage["DESCRIPTION_REQUIREMENT"] = "Description is requirement";
    RoleErrorMessage["LOGIN_ERROR"] = "Username or password is not found";
})(RoleErrorMessage = exports.RoleErrorMessage || (exports.RoleErrorMessage = {}));
var ApiErrorMessage;
(function (ApiErrorMessage) {
    ApiErrorMessage["NOT_FOUND"] = "API was not founded";
    ApiErrorMessage["CONFLICT"] = "User was existed";
    ApiErrorMessage["NO_NAME"] = "Username was not founded";
    ApiErrorMessage["NO_ID"] = "ApiId is requirement";
    ApiErrorMessage["RQ_BODY_FAIL"] = "Api`s body is invalid";
    ApiErrorMessage["DATA_REQUIREMENT"] = "Data is requirement";
    ApiErrorMessage["PASS_TOO_SHORT"] = "Password is too short";
    ApiErrorMessage["FULL_NAME_REQUIREMENT"] = "Full Name is requirement";
    ApiErrorMessage["DESCRIPTION_REQUIREMENT"] = "Description is requirement";
    ApiErrorMessage["LOGIN_ERROR"] = "Username or password is not found";
    ApiErrorMessage["API_DTO"] = "Api dto is failure";
    ApiErrorMessage["MODULE"] = "Module id is not found";
    ApiErrorMessage["METHOD_ID"] = "method is not found";
    ApiErrorMessage["ROLE_IDS"] = "roleIds is not found";
})(ApiErrorMessage = exports.ApiErrorMessage || (exports.ApiErrorMessage = {}));
var GameErrorMessage;
(function (GameErrorMessage) {
    GameErrorMessage["NOT_FOUND"] = "User was not founded";
    GameErrorMessage["CONFLICT"] = "User was existed";
    GameErrorMessage["NO_NAME"] = "Username was not founded";
    GameErrorMessage["NO_ID"] = "GameId is requirement";
    GameErrorMessage["RQ_BODY_FAIL"] = "User`s body is invalid";
    GameErrorMessage["DATA_REQUIREMENT"] = "Data is requirement";
    GameErrorMessage["PASS_TOO_SHORT"] = "Password is too short";
    GameErrorMessage["FULL_NAME_REQUIREMENT"] = "Full Name is requirement";
    GameErrorMessage["DESCRIPTION_REQUIREMENT"] = "Description is requirement";
    GameErrorMessage["LOGIN_ERROR"] = "Username or password is not found";
})(GameErrorMessage = exports.GameErrorMessage || (exports.GameErrorMessage = {}));
var ProfileErrorMessage;
(function (ProfileErrorMessage) {
    ProfileErrorMessage["NOT_FOUND"] = "User was not founded";
    ProfileErrorMessage["CONFLICT"] = "User was existed";
    ProfileErrorMessage["NO_NAME"] = "Username was not founded";
    ProfileErrorMessage["NO_ID"] = "ProfileId is requirement";
    ProfileErrorMessage["RQ_BODY_FAIL"] = "User`s body is invalid";
    ProfileErrorMessage["DATA_REQUIREMENT"] = "Data is requirement";
    ProfileErrorMessage["PASS_TOO_SHORT"] = "Password is too short";
    ProfileErrorMessage["FULL_NAME_REQUIREMENT"] = "Full Name is requirement";
    ProfileErrorMessage["DESCRIPTION_REQUIREMENT"] = "Description is requirement";
    ProfileErrorMessage["LOGIN_ERROR"] = "Username or password is not found";
})(ProfileErrorMessage = exports.ProfileErrorMessage || (exports.ProfileErrorMessage = {}));
var CommonErrorMessage;
(function (CommonErrorMessage) {
    CommonErrorMessage["SUCCESS"] = "success";
    CommonErrorMessage["ERROR"] = "Failure";
    CommonErrorMessage["NOT_FOUND"] = "Not found";
    CommonErrorMessage["REQUEST_BODY_ERR"] = "Body is invalid";
    CommonErrorMessage["UNKNOWN"] = "Unknown";
    CommonErrorMessage["TOKEN_INVALID"] = "Token is invalid";
    CommonErrorMessage["BODY_IS_NEEDED"] = "Body is needed";
    CommonErrorMessage["ID_IS_NEEDED"] = "Id is need";
    CommonErrorMessage["DATA_IS_NOT_EXISTED"] = "Data is not existed";
    CommonErrorMessage["CONFLICT"] = "Data is conflict";
})(CommonErrorMessage = exports.CommonErrorMessage || (exports.CommonErrorMessage = {}));
var FriendErrorMessage;
(function (FriendErrorMessage) {
    FriendErrorMessage["SENDER_REQUIREMENT"] = "Sender Id is invalid";
    FriendErrorMessage["RECEIVER_REQUIREMENT"] = "Receiver Id is invalid";
    FriendErrorMessage["CONFLICT"] = "Friend request was sended";
    FriendErrorMessage["RQ_BODY_FAIL"] = "Friend Request body is invalid";
})(FriendErrorMessage = exports.FriendErrorMessage || (exports.FriendErrorMessage = {}));
var RoomErrorMessage;
(function (RoomErrorMessage) {
    RoomErrorMessage["NO_NAME"] = "Room`s name is requirement";
    RoomErrorMessage["NO_ID"] = "Id is requirement";
    RoomErrorMessage["CONFLICT"] = "Room was existed";
    RoomErrorMessage["NOT_FOUND"] = "Room was not founded";
    RoomErrorMessage["SUCCESS"] = "Room creating is successfully";
    RoomErrorMessage["DATA_REQUIREMENT"] = "Room data is requirement";
    RoomErrorMessage["RQ_BODY_FAIL"] = "Room body is invalid";
    RoomErrorMessage["FULL"] = "Room is full";
    RoomErrorMessage["IN_ROOM"] = "Already in room";
    RoomErrorMessage["OUT_ROOM"] = "Not join any room";
})(RoomErrorMessage = exports.RoomErrorMessage || (exports.RoomErrorMessage = {}));
var CommonMessage;
(function (CommonMessage) {
    CommonMessage["SUCCESS"] = "success";
    CommonMessage["ERROR"] = "Failure";
    CommonMessage["NOT_FOUND"] = "Not found";
    CommonMessage["REQUEST_BODY_ERR"] = "Body is invalid";
    CommonMessage["UNKNOWN"] = "Unknown";
    CommonMessage["TOKEN_INVALID"] = "Token is invalid";
    CommonMessage["BODY_IS_NEEDED"] = "Body is needed";
    CommonMessage["ID_IS_NEEDED"] = "Id is need";
    CommonMessage["DATA_IS_NOT_EXISTED"] = "Data did`nt existed";
    CommonMessage["CONFLICT"] = "Conflict";
    CommonMessage["BAD_REQUEST"] = "Bad request";
})(CommonMessage = exports.CommonMessage || (exports.CommonMessage = {}));
