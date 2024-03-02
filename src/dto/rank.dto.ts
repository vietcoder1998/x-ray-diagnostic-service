export default class RankDto {
    id?: number
    ownerId?: number
    score?: number
    gameId?: number

    /**
     *
     */
    constructor(id: number, ownerId: number, score: number, gameId: number) {
        this.id = id
        this.ownerId = ownerId
        this.score = score
        this.gameId = gameId
    }
}
