import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import GameHistoryDto from '../dto/game-history.dto'
import { EntityTypes } from '../enums/entity.enum'
import timeStamp from '../utils/time'
import GameEntity from './game.entity'
import UserEntity from './user.entity'

@Entity(EntityTypes.GAME_HISTORY)
export default class GameHistoryEntity extends GameHistoryDto {
    @PrimaryColumn('uuid', { length: 36 })
    id: string

    @Column({
        type: 'int',
        nullable: true,
    })
    state: number

    @Column({
        type: 'int',
        nullable: false,
    })
    roomId: number

    @Column({
        type: 'int',
        nullable: false,
    })
    gold?: number

    @Column({
        type: 'text',
        nullable: false,
    })
    data?: string

    @Column({
        type: 'int',
        nullable: false,
    })
    createdDate?: number

    @ManyToOne((type) => UserEntity, (userEntity) => userEntity.id)
    @JoinColumn({ name: 'ownerId' })
    ownerId: string

    @ManyToOne((type) => GameEntity, (gameEntity) => gameEntity.id)
    @JoinColumn()
    gameId: number

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
        super(id, ownerId, state, data, roomId, gold, diamond)
        this.createdDate = createdDate || timeStamp
    }
}
