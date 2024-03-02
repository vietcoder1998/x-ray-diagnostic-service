export enum UserErrorMessage {
    NOT_FOUND = 'User was not founded',
    CONFLICT = 'User was existed',
    NO_NAME = 'Username was not founded',
    NO_ID = 'UserId is requirement',
    RQ_BODY_FAIL = 'User`s body is invalid',
    DATA_REQUIREMENT = 'Data is requirement',
    PASS_TOO_SHORT = 'Password is too short',
    FULL_NAME_REQUIREMENT = 'Full Name is requirement',
    DESCRIPTION_REQUIREMENT = 'Description is requirement',
    LOGIN_ERROR = 'Username or password is not found',
}

export enum GameHistoryErrorMessage {
    NOT_FOUND = 'User was not founded',
    CONFLICT = 'User was existed',
    NO_NAME = 'Username was not founded',
    NO_ID = 'GameHistoryId is requirement',
    RQ_BODY_FAIL = 'User`s body is invalid',
    DATA_REQUIREMENT = 'Data is requirement',
    PASS_TOO_SHORT = 'Password is too short',
    FULL_NAME_REQUIREMENT = 'Full Name is requirement',
    DESCRIPTION_REQUIREMENT = 'Description is requirement',
    LOGIN_ERROR = 'Username or password is not found',
}

export enum RoleErrorMessage {
    NOT_FOUND = 'Role was not founded',
    CONFLICT = 'Role was existed',
    NO_NAME = 'Username was not founded',
    NO_ID = 'RoleId is requirement',
    RQ_BODY_FAIL = 'Role`s body is invalid',
    DATA_REQUIREMENT = 'Data is requirement',
    PASS_TOO_SHORT = 'Password is too short',
    FULL_NAME_REQUIREMENT = 'Full Name is requirement',
    DESCRIPTION_REQUIREMENT = 'Description is requirement',
    LOGIN_ERROR = 'Username or password is not found',
}

export enum ApiErrorMessage {
    NOT_FOUND = 'API was not founded',
    CONFLICT = 'User was existed',
    NO_NAME = 'Username was not founded',
    NO_ID = 'ApiId is requirement',
    RQ_BODY_FAIL = 'Api`s body is invalid',
    DATA_REQUIREMENT = 'Data is requirement',
    PASS_TOO_SHORT = 'Password is too short',
    FULL_NAME_REQUIREMENT = 'Full Name is requirement',
    DESCRIPTION_REQUIREMENT = 'Description is requirement',
    LOGIN_ERROR = 'Username or password is not found',
    API_DTO = 'Api dto is failure',
    MODULE = 'Module id is not found',
    METHOD_ID = 'method is not found',
    ROLE_IDS = 'roleIds is not found',
}

export enum GameErrorMessage {
    NOT_FOUND = 'User was not founded',
    CONFLICT = 'User was existed',
    NO_NAME = 'Username was not founded',
    NO_ID = 'GameId is requirement',
    RQ_BODY_FAIL = 'User`s body is invalid',
    DATA_REQUIREMENT = 'Data is requirement',
    PASS_TOO_SHORT = 'Password is too short',
    FULL_NAME_REQUIREMENT = 'Full Name is requirement',
    DESCRIPTION_REQUIREMENT = 'Description is requirement',
    LOGIN_ERROR = 'Username or password is not found',
}

export enum ProfileErrorMessage {
    NOT_FOUND = 'User was not founded',
    CONFLICT = 'User was existed',
    NO_NAME = 'Username was not founded',
    NO_ID = 'ProfileId is requirement',
    RQ_BODY_FAIL = 'User`s body is invalid',
    DATA_REQUIREMENT = 'Data is requirement',
    PASS_TOO_SHORT = 'Password is too short',
    FULL_NAME_REQUIREMENT = 'Full Name is requirement',
    DESCRIPTION_REQUIREMENT = 'Description is requirement',
    LOGIN_ERROR = 'Username or password is not found',
}

export enum CommonErrorMessage {
    SUCCESS = 'success',
    ERROR = 'Failure',
    NOT_FOUND = 'Not found',
    REQUEST_BODY_ERR = 'Body is invalid',
    UNKNOWN = 'Unknown',
    TOKEN_INVALID = 'Token is invalid',
    BODY_IS_NEEDED = 'Body is needed',
    ID_IS_NEEDED = 'Id is need',
    DATA_IS_NOT_EXISTED = 'Data is not existed',
    CONFLICT = 'Data is conflict',
}

export enum FriendErrorMessage {
    SENDER_REQUIREMENT = 'Sender Id is invalid',
    RECEIVER_REQUIREMENT = 'Receiver Id is invalid',
    CONFLICT = 'Friend request was sended',
    RQ_BODY_FAIL = 'Friend Request body is invalid',
}

export enum RoomErrorMessage {
    NO_NAME = 'Room`s name is requirement',
    NO_ID = 'Id is requirement',
    CONFLICT = 'Room was existed',
    NOT_FOUND = 'Room was not founded',
    SUCCESS = 'Room creating is successfully',
    DATA_REQUIREMENT = 'Room data is requirement',
    RQ_BODY_FAIL = 'Room body is invalid',
    FULL = 'Room is full',
    IN_ROOM = 'Already in room',
    OUT_ROOM = 'Not join any room',
}

export enum CommonMessage {
    SUCCESS = 'success',
    ERROR = 'Failure',
    NOT_FOUND = 'Not found',
    REQUEST_BODY_ERR = 'Body is invalid',
    UNKNOWN = 'Unknown',
    TOKEN_INVALID = 'Token is invalid',
    BODY_IS_NEEDED = 'Body is needed',
    ID_IS_NEEDED = 'Id is need',
    DATA_IS_NOT_EXISTED = 'Data did`nt existed',
    CONFLICT = 'Conflict',
    BAD_REQUEST = 'Bad request',
}
