export default class GameDto {
    id?: number
    name?: string
    description?: string
    ip?: string

    constructor(id?: number, name?: string, description?: string, ip?: string) {
        this.id = id
        this.name = name
        this.description = description
        this.ip = ip
    }
}
