const MANAGER = {
    SQL: 'default',
    MONGO: 'mongo',
}

const API_VERSION = {
    V1: 'v1',
    V2: 'v2',
}

const ROUTER = {
    AUTH: 'oauth2',
    USER: 'user',
    PROFILE: 'profile',
}

const PATHS = {
    LIST: '/list',
    CREATE: '/create',
    DELETE: '/delete',
    AUTH: {
        LOGIN: '/login',
        REGISTER: '/register',
        LOGOUT: '/logout',
    },
}

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
}

const ENTITIES = {
    USER: 'users',
    PROFILE: 'profile',
    ONLINE_PLAYER: 'online_players',
    MESSAGES: 'messages',
    ROOMS: 'rooms',
    CHAT_USERS: 'chat_users',
}

const EGO_API = 'http://id.8am.us'

export {
    MANAGER,
    API_VERSION,
    TAGS,
    EGO_API,
    ROUTER,
    PATHS,
    ENTITIES,
}
