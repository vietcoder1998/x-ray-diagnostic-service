"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENTITIES = exports.PATHS = exports.ROUTER = exports.EGO_API = exports.TAGS = exports.API_VERSION = exports.MANAGER = void 0;
const MANAGER = {
    SQL: 'default',
    MONGO: 'mongo',
};
exports.MANAGER = MANAGER;
const API_VERSION = {
    V1: 'v1',
    V2: 'v2',
};
exports.API_VERSION = API_VERSION;
const ROUTER = {
    AUTH: 'oauth2',
    USER: 'user',
    PROFILE: 'profile',
};
exports.ROUTER = ROUTER;
const PATHS = {
    LIST: '/list',
    CREATE: '/create',
    DELETE: '/delete',
    AUTH: {
        LOGIN: '/login',
        REGISTER: '/register',
        LOGOUT: '/logout',
    },
};
exports.PATHS = PATHS;
const TAGS = {
    USER: 'user',
    AUTH: 'oauth2',
    ONLINE_PLAYER: 'online-player',
    FRIEND_REQUEST: 'friend',
    RANK: 'rank',
    PAYMENT: 'payment',
    GAME: 'game',
    ROLE: 'role',
    GAME_HISTORY: 'game-history',
    API: 'api',
};
exports.TAGS = TAGS;
const ENTITIES = {
    USER: 'users',
    PROFILE: 'profile',
    ONLINE_PLAYER: 'online_players',
    MESSAGES: 'messages',
    ROOMS: 'rooms',
    CHAT_USERS: 'chat_users',
};
exports.ENTITIES = ENTITIES;
const EGO_API = 'http://id.8am.us';
exports.EGO_API = EGO_API;
