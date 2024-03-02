import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm'
import { ENTITIES } from '../config/const'
import ProfileDto from '../dto/profile.dto'
import UserEntity from './user.entity'

@Entity(ENTITIES.PROFILE)
export default class ProfileEntity extends ProfileDto {
    @PrimaryColumn('uuid', { length: 36 })
    id: string

    @Column({
        type: 'varchar',
        nullable: true,
    })
    name: string

    @Column({
        nullable: true,
        type: 'varchar',
    })
    coverUrl: string

    @Column({
        nullable: true,
        type: 'varchar',
    })
    state: number

    @Column({
        nullable: true,
        type: 'varchar',
    })
    avatarUrl: string

    @Column({
        nullable: true,
        type: 'bigint',
    })
    createdDate: number

    @OneToOne((type) => ProfileEntity, { cascade: false })
    user: UserEntity
}
