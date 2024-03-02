export default class GameHistoryDto {
    id?: string
    ownerId?: string
    state?: number
    gameId?: number
    createdDate?: number
    data?: string
    roomId?: number
    gold?: number
    diamond?: number

    /**
     *
     */
    constructor(
        id?: string,
        ownerId?: string,
        state?: number,
        data?: string,
        roomId?: number,
        gold?: number,
        diamond?: number,
        createdDate?: number
    ) {
        this.id = id
        this.ownerId = ownerId
        this.state = state
        this.data = data
        this.roomId = roomId
        this.gold = gold
        this.diamond = diamond
        this.createdDate = createdDate || new Date().getTime()
    }
}
