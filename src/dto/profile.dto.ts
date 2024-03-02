import * as uuid from 'uuid'

export default class ProfileDto {
    id?: string
    name?: string
    avatarUrl?: string
    coverUrl?: string
    state?: number
    createdDate?: number

    constructor(
        id?: string,
        name?: string,
        state?: number,
        avatarUrl?: string,
        coverUrl?: string
    ) {
        this.id = id || uuid.v1()
        this.name = name
        this.state = state
        this.avatarUrl = avatarUrl
        this.coverUrl = coverUrl
        this.createdDate = new Date().getTime()
    }
}
