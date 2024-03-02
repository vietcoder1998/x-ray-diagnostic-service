import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import GameDto from '../dto/game.dto'
import { EntityTypes } from '../enums/entity.enum'

@Entity(EntityTypes.GAME)
export default class GameEntity extends GameDto {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar',
        nullable: true,
    })
    name: string

    @Column({
        type: 'varchar',
        nullable: true,
    })
    description: string

    @Column({
        type: 'varchar',
        nullable: true,
    })
    ip: string

    constructor(id?: number, name?: string, description?: string, ip?: string) {
        super(id, name, description, ip)
    }
}
