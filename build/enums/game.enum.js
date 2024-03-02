"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Direction = exports.ShapeType = exports.GameType = void 0;
var GameType;
(function (GameType) {
    GameType["TETRIS"] = "tetris";
})(GameType = exports.GameType || (exports.GameType = {}));
var ShapeType;
(function (ShapeType) {
    ShapeType[ShapeType["PICACHU"] = 1] = "PICACHU";
    ShapeType[ShapeType["FUSHIGI"] = 2] = "FUSHIGI";
    ShapeType[ShapeType["PURIN"] = 3] = "PURIN";
    ShapeType[ShapeType["PIPI"] = 4] = "PIPI";
})(ShapeType = exports.ShapeType || (exports.ShapeType = {}));
var Direction;
(function (Direction) {
    Direction["LEFT"] = "left";
    Direction["RIGHT"] = "right";
    Direction["DOWN"] = "down";
    Direction["UP"] = "up";
})(Direction = exports.Direction || (exports.Direction = {}));
