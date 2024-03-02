import * as uuid from 'uuid'

export default class UserDto {
    id: string
    username?: string
    password?: string
    email?: string
    token?: string
    roleId?: number
    accountTypeId?: number
    gold?: number
    diamond?: number
    ban?: number

    constructor(
        id: string,
        username?: string,
        password?: string,
        email?: string,
        roleId?: number,
        accountTypeId?: number,
        gold?: number,
        diamond?: number,
        ban?: number,
        token?: string
    ) {
        this.id = id || uuid.v1()
        this.username = username
        this.password = password
        this.email = email
        this.token = token
        this.roleId = roleId
        this.accountTypeId = accountTypeId
        this.ban = ban || 0
        this.gold = gold
        this.diamond = diamond
    }
}
