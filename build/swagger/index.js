"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swaggerJSDoc = require("swagger-jsdoc");
const const_1 = require("../config/const");
// object for swagger
const specsOptions = {
    swaggerDefinition: {
        info: {
            title: 'Tetris api service',
            description: 'Game api for ego',
            contact: {
                name: 'Tran Duy Viet',
                email: 'duyviet2841998@gmail.com',
            },
            version: '2.0.0',
        },
        title: 'User',
        tags: [
            { name: const_1.TAGS.USER, description: 'Everything about user' },
            { name: const_1.TAGS.AUTH, description: 'Setup Token and oauth2' },
            { name: const_1.TAGS.ONLINE_PLAYER, description: 'All of online user' },
            { name: const_1.TAGS.GAME, description: 'Add game and user use for game' },
            { name: const_1.TAGS.GAME_HISTORY, description: 'Add game history' },
            {
                name: const_1.TAGS.PAYMENT,
                description: 'Change data on payment update',
            },
            {
                name: const_1.TAGS.GAME,
                description: 'Change data on payment update',
            },
        ],
        schemes: ['http', 'https'],
        basePath: '/v1',
        securityDefinitions: {
            token: {
                type: 'apiKey',
                name: 'token',
                in: 'header',
            },
        },
        produces: ['applications/json'],
        paths: {
            // photo api
            '/profile/{userId}': {
                get: {
                    tags: ['profile'],
                    description: 'Get profile of user',
                    parameters: [
                        {
                            name: 'userId',
                            description: 'id`s user that will take profile',
                            require: true,
                            in: 'path',
                            type: 'string',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                        404: {
                            description: 'not found',
                        },
                    },
                },
            },
            '/profile/{userId}/avatar': {
                put: {
                    tags: ['profile'],
                    description: 'Update profile of user',
                    consumes: ['multipart/form-data'],
                    parameters: [
                        {
                            name: 'avatarFile',
                            description: '.png, .jpg, .jpeg',
                            require: true,
                            in: 'formData',
                            type: 'file',
                        },
                        {
                            name: 'userId',
                            description: 'id`s user ',
                            require: true,
                            in: 'path',
                            type: 'string',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                        404: {
                            description: 'not found',
                        },
                    },
                },
            },
            '/profile/{userId}/update': {
                put: {
                    tags: ['profile'],
                    description: 'Update profile of user',
                    parameters: [
                        {
                            name: 'body',
                            description: '.png, .jpg, .jpeg',
                            require: true,
                            default: {
                                name: '',
                                birthday: '',
                            },
                            in: 'body',
                        },
                        {
                            name: 'userId',
                            description: 'id`s user ',
                            require: true,
                            in: 'path',
                            type: 'string',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                        404: {
                            description: 'not found',
                        },
                    },
                },
            },
            '/profile/{userId}/cover': {
                put: {
                    tags: ['profile'],
                    description: 'Update profile of user',
                    consumes: ['multipart/form-data'],
                    parameters: [
                        {
                            name: 'coverFile',
                            description: '.png, .jpg, .jpeg',
                            require: true,
                            in: 'formData',
                            type: 'file',
                        },
                        {
                            name: 'userId',
                            description: 'id`s user ',
                            require: true,
                            in: 'path',
                            type: 'string',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                        404: {
                            description: 'not found',
                        },
                    },
                },
            },
            // User API
            '/upload': {
                post: {
                    tags: ['photo'],
                    description: 'Get list user',
                    consumes: ['multipart/form-data'],
                    parameters: [
                        {
                            name: 'file',
                            description: 'upload image and save in server',
                            require: false,
                            in: 'formData',
                            type: 'file',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                        404: {
                            description: 'not found',
                        },
                    },
                },
            },
            '/user/list': {
                get: {
                    tags: [const_1.TAGS.USER],
                    description: 'Get list user',
                    security: [
                        {
                            token: 'token',
                        },
                    ],
                    parameters: [
                        {
                            name: 'page',
                            description: 'index of user',
                            in: 'query',
                            require: false,
                            schema: {
                                type: 'integer',
                                minimum: 0,
                            },
                        },
                        {
                            name: 'size',
                            description: 'size of user',
                            require: false,
                            in: 'query',
                            schema: {
                                type: 'integer',
                                minimum: 0,
                            },
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                        404: {
                            description: 'not found',
                        },
                    },
                },
            },
            '/user/{userId}': {
                get: {
                    tags: [const_1.TAGS.USER],
                    description: 'simpler init',
                    security: [
                        {
                            token: 'token',
                        },
                    ],
                    parameters: [
                        {
                            name: 'userId',
                            required: true,
                            description: 'id of user',
                            in: 'path',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                    },
                },
                delete: {
                    tags: [const_1.TAGS.USER],
                    description: 'remove user',
                    security: [
                        {
                            token: 'token',
                        },
                    ],
                    parameters: [
                        {
                            name: 'id',
                            required: true,
                            description: 'id of user',
                            in: 'path',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                        404: {
                            description: 'user is existed',
                        },
                    },
                },
            },
            '/user/create': {
                post: {
                    tags: [const_1.TAGS.USER],
                    description: 'create user',
                    security: [
                        {
                            token: 'token',
                        },
                    ],
                    parameters: [
                        {
                            name: 'body',
                            required: true,
                            description: 'id of user',
                            example: {
                                username: `user${Math.floor(Math.random() * 100)}`,
                                password: `qw123#.`,
                            },
                            in: 'body',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                        404: {
                            description: 'user is existed',
                        },
                    },
                },
            },
            // ROLE API
            '/role/list': {
                get: {
                    tags: [const_1.TAGS.ROLE],
                    description: 'Get list user',
                    security: [
                        {
                            token: 'token',
                        },
                    ],
                    parameters: [
                        {
                            name: 'page',
                            description: 'index of user',
                            in: 'query',
                            require: false,
                            schema: {
                                type: 'integer',
                                minimum: 0,
                            },
                        },
                        {
                            name: 'size',
                            description: 'size of user',
                            require: false,
                            in: 'query',
                            schema: {
                                type: 'integer',
                                minimum: 0,
                            },
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                        404: {
                            description: 'not found',
                        },
                    },
                },
            },
            '/role/{roleId}': {
                get: {
                    tags: [const_1.TAGS.ROLE],
                    description: 'simpler init',
                    security: [
                        {
                            token: 'token',
                        },
                    ],
                    parameters: [
                        {
                            name: 'roleId',
                            required: true,
                            description: 'id of user',
                            in: 'path',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                    },
                },
                delete: {
                    tags: [const_1.TAGS.ROLE],
                    description: 'remove user',
                    security: [
                        {
                            token: 'token',
                        },
                    ],
                    parameters: [
                        {
                            name: 'id',
                            required: true,
                            description: 'id of user',
                            in: 'path',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                        404: {
                            description: 'user is existed',
                        },
                    },
                },
            },
            '/role/create': {
                post: {
                    tags: [const_1.TAGS.ROLE],
                    description: 'create user',
                    security: [
                        {
                            token: 'token',
                        },
                    ],
                    parameters: [
                        {
                            name: 'body',
                            required: true,
                            description: 'id of user',
                            example: {
                                username: `user${Math.floor(Math.random() * 100)}`,
                                password: `qw123#.`,
                            },
                            in: 'body',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                        404: {
                            description: 'user is existed',
                        },
                    },
                },
            },
            // API
            '/api/list': {
                get: {
                    tags: [const_1.TAGS.API],
                    description: 'Get list user',
                    security: [
                        {
                            token: 'token',
                        },
                    ],
                    parameters: [
                        {
                            name: 'page',
                            description: 'index of page for api',
                            in: 'query',
                            type: 'number',
                            require: false,
                            schema: {
                                type: 'integer',
                                minimum: 0,
                            },
                        },
                        {
                            name: 'size',
                            description: 'size of page for api',
                            require: false,
                            type: 'number',
                            in: 'query',
                            schema: {
                                type: 'integer',
                                minimum: 0,
                            },
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                        404: {
                            description: 'not found',
                        },
                    },
                },
            },
            '/api/{apiId}': {
                get: {
                    tags: [const_1.TAGS.API],
                    description: 'simpler init',
                    security: [
                        {
                            token: 'token',
                        },
                    ],
                    parameters: [
                        {
                            name: 'apiId',
                            required: true,
                            description: 'id of user',
                            in: 'path',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                    },
                },
                delete: {
                    tags: [const_1.TAGS.API],
                    description: 'remove user',
                    security: [
                        {
                            token: 'token',
                        },
                    ],
                    parameters: [
                        {
                            name: 'apiId',
                            required: true,
                            description: 'id of user',
                            in: 'path',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                        404: {
                            description: 'user is existed',
                        },
                    },
                },
            },
            '/api/create': {
                post: {
                    tags: [const_1.TAGS.API],
                    description: 'create api',
                    security: [
                        {
                            token: 'token',
                        },
                    ],
                    parameters: [
                        {
                            name: 'body',
                            required: true,
                            description: 'id of user',
                            example: {
                                path: '/api/test',
                                description: 'desc',
                                moduleId: 1,
                                methodId: 1,
                                roleIds: [1, 2, 3],
                            },
                            in: 'body',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                        404: {
                            description: 'user is existed',
                        },
                    },
                },
            },
            '/api/{apiId}/update/role': {
                put: {
                    tags: [const_1.TAGS.API],
                    description: 'create api',
                    security: [
                        {
                            token: 'token',
                        },
                    ],
                    parameters: [
                        {
                            name: 'roleIds',
                            required: true,
                            description: 'id of user',
                            example: [1],
                            in: 'body',
                        },
                        {
                            name: 'apiId',
                            required: true,
                            description: 'id of user',
                            example: 26,
                            in: 'path',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                        404: {
                            description: 'user is existed',
                        },
                    },
                },
            },
            '/game/list': {
                get: {
                    tags: [const_1.TAGS.GAME],
                    description: 'Get list user',
                    security: [
                        {
                            token: 'token',
                        },
                    ],
                    parameters: [
                        {
                            name: 'page',
                            description: 'index of user',
                            in: 'query',
                            require: false,
                            schema: {
                                type: 'integer',
                                minimum: 0,
                            },
                        },
                        {
                            name: 'size',
                            description: 'size of user',
                            require: false,
                            in: 'query',
                            schema: {
                                type: 'integer',
                                minimum: 0,
                            },
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                        404: {
                            description: 'not found',
                        },
                    },
                },
            },
            '/game/{gameId}': {
                get: {
                    tags: [const_1.TAGS.GAME],
                    description: 'simpler init',
                    security: [
                        {
                            token: 'token',
                        },
                    ],
                    parameters: [
                        {
                            name: 'gameId',
                            required: true,
                            description: 'id of user',
                            in: 'path',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                    },
                },
                delete: {
                    tags: [const_1.TAGS.GAME],
                    description: 'remove user',
                    security: [
                        {
                            token: 'token',
                        },
                    ],
                    parameters: [
                        {
                            name: 'gameId',
                            required: true,
                            description: 'id of user',
                            in: 'path',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                        404: {
                            description: 'user is existed',
                        },
                    },
                },
            },
            '/game/create': {
                post: {
                    tags: [const_1.TAGS.GAME],
                    description: 'create api',
                    security: [
                        {
                            token: 'token',
                        },
                    ],
                    parameters: [
                        {
                            name: 'body',
                            required: true,
                            description: 'Create api with rolIds is list of role to use api',
                            example: {
                                name: '/api/test',
                                description: '',
                                moduleId: '',
                                methodId: '',
                                roleIds: [''],
                            },
                            in: 'body',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                        404: {
                            description: 'user is existed',
                        },
                    },
                },
            },
            // AUTH API
            '/oauth2/login': {
                post: {
                    tags: [const_1.TAGS.AUTH],
                    description: 'Login',
                    parameters: [
                        {
                            example: {
                                username: 'admin',
                                password: '123456',
                            },
                            in: 'body',
                            name: 'body',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                        404: {
                            description: 'not found',
                        },
                    },
                },
            },
            '/oauth2/register': {
                post: {
                    tags: [const_1.TAGS.AUTH],
                    description: 'Register',
                    parameters: [
                        {
                            description: '1 User only 1 account',
                            name: 'body',
                            in: 'body',
                            example: {
                                username: 'user1',
                                password: 'qw123#.',
                            },
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                        404: {
                            description: 'not found',
                        },
                    },
                },
            },
            '/oauth2/th3/login': {
                post: {
                    tags: [const_1.TAGS.AUTH],
                    description: 'Login',
                    parameters: [
                        {
                            example: {
                                email: 'user1',
                                token: '',
                                accountType: '',
                            },
                            in: 'body',
                            name: 'body',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                        404: {
                            description: 'not found',
                        },
                    },
                },
            },
            '/oauth2/th3/register': {
                post: {
                    tags: [const_1.TAGS.AUTH],
                    description: 'Login',
                    parameters: [
                        {
                            example: {
                                username: 'user1',
                                password: 'qw123#.',
                            },
                            in: 'body',
                            name: 'body',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                        404: {
                            description: 'not found',
                        },
                    },
                },
            },
            //Online User Api
            '/online-player/{userId}': {
                get: {
                    tags: [const_1.TAGS.ONLINE_PLAYER],
                    description: 'get user info from ego',
                    security: [
                        {
                            token: 'token',
                        },
                    ],
                    parameters: [
                        {
                            name: 'user_id',
                            description: 'id of user',
                            required: true,
                            in: 'path',
                            default: '1619458881785',
                            schema: {
                                type: 'string',
                            },
                        },
                    ],
                },
            },
            '/friend/list': {
                get: {
                    tags: [const_1.TAGS.FRIEND_REQUEST],
                    description: 'Get user friend request',
                    parameters: [
                        {
                            name: 'paged',
                            in: 'query',
                            default: 0,
                        },
                        {
                            name: 'limit',
                            in: 'query',
                            default: 10,
                        },
                    ],
                    security: [
                        {
                            token: 'token',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                        404: {
                            description: 'not found',
                        },
                    },
                },
            },
            '/friend/send': {
                post: {
                    tags: [const_1.TAGS.FRIEND_REQUEST],
                    description: 'Send friend request',
                    parameters: [
                        {
                            name: 'friendId',
                            in: 'query',
                            default: null,
                        },
                    ],
                    security: [
                        {
                            token: 'token',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                        404: {
                            description: 'not found',
                        },
                    },
                },
            },
            '/rank/list': {
                get: {
                    tags: [const_1.TAGS.RANK],
                    description: 'Get user friend request',
                    parameters: [
                        {
                            name: 'userId',
                            in: 'query',
                            default: 0,
                        },
                        {
                            name: 'paged',
                            in: 'query',
                            default: 0,
                        },
                        {
                            name: 'limit',
                            in: 'query',
                            default: 10,
                        },
                    ],
                    security: [
                        {
                            token: 'token',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                        404: {
                            description: 'not found',
                        },
                    },
                },
            },
            '/rank/update': {
                post: {
                    tags: [const_1.TAGS.RANK],
                    description: 'Update ranking',
                    parameters: [
                        {
                            name: 'point',
                            in: 'query',
                            default: 0,
                        },
                    ],
                    security: [
                        {
                            token: 'token',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                        404: {
                            description: 'not found',
                        },
                    },
                },
            },
            '/payment/list': {
                get: {
                    tags: [const_1.TAGS.PAYMENT],
                    description: 'Get list user',
                    security: [
                        {
                            token: 'token',
                        },
                    ],
                    parameters: [
                        {
                            name: 'page',
                            description: 'index of user',
                            in: 'query',
                            require: false,
                            schema: {
                                type: 'integer',
                                minimum: 0,
                            },
                        },
                        {
                            name: 'size',
                            description: 'size of user',
                            require: false,
                            in: 'query',
                            schema: {
                                type: 'integer',
                                minimum: 0,
                            },
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                        404: {
                            description: 'not found',
                        },
                    },
                },
            },
            '/payment/{paymentId}': {
                get: {
                    tags: [const_1.TAGS.PAYMENT],
                    description: 'simpler init',
                    security: [
                        {
                            token: 'token',
                        },
                    ],
                    parameters: [
                        {
                            name: 'paymentId',
                            required: true,
                            description: 'id of user',
                            in: 'path',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                    },
                },
                delete: {
                    tags: [const_1.TAGS.PAYMENT],
                    description: 'remove user',
                    security: [
                        {
                            token: 'token',
                        },
                    ],
                    parameters: [
                        {
                            name: 'paymentId',
                            required: true,
                            description: 'id of user',
                            in: 'path',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                        404: {
                            description: 'user is existed',
                        },
                    },
                },
            },
            '/payment/create': {
                post: {
                    tags: [const_1.TAGS.PAYMENT],
                    description: 'create api',
                    security: [
                        {
                            token: 'token',
                        },
                    ],
                    parameters: [
                        {
                            name: 'body',
                            required: true,
                            description: 'Create api with rolIds is list of role to use api',
                            example: {
                                name: '/v1/api/test',
                                description: '',
                                moduleId: '',
                                methodId: '',
                                roleIds: [1, 2, 3],
                            },
                            in: 'body',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                        404: {
                            description: 'user is existed',
                        },
                    },
                },
            },
            '/game/save': {
                put: {
                    tags: [const_1.TAGS.GAME],
                    description: 'Save game history',
                    parameters: [
                        {
                            name: 'roomId',
                            in: 'query',
                            default: 1,
                        },
                        {
                            name: 'type',
                            in: 'query',
                            default: 1,
                        },
                        {
                            name: 'money',
                            in: 'query',
                            default: 20,
                        },
                        {
                            name: 'score',
                            in: 'query',
                            default: 20,
                        },
                        {
                            name: 'level',
                            in: 'query',
                            default: 1,
                        },
                        {
                            name: 'mode',
                            in: 'query',
                            default: 20,
                        },
                        {
                            name: 'type',
                            in: 'query',
                            default: 20,
                        },
                        {
                            name: 'isWin',
                            in: 'query',
                            default: 1,
                        },
                    ],
                    security: [
                        {
                            token: 'token',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                        404: {
                            description: 'not found',
                        },
                    },
                },
            },
        },
    },
    apis: ['/v1', '/v2'],
};
const specs = swaggerJSDoc(specsOptions);
exports.default = specs;
