export default class ApiDto {
    id?: number
    path: string
    description: string

    constructor(id?: number, path?: string, description?: string) {
        this.id = id
        this.path = path
        this.description = description
    }
}
