export default class PaymentDto {
    id?: number
    game?: number
    createdDate?: number
    state?: number
    unit?: string
    lastQuantity?: number
    updateQuantity?: number
    ownerId?: number

    constructor(
        id: number,
        game?: number,
        ownderId?: number,
        unit?: string,
        createdDate?: number,
        state?: number,
        lastQuantity?: number,
        updateQuantity?: number
    ) {
        this.id = id
        this.game = game
        this.createdDate = createdDate
        this.state = state
        this.lastQuantity = lastQuantity
        this.updateQuantity = updateQuantity
        this.ownerId = ownderId
        this.unit = unit
    }
}
