import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
} from 'typeorm'
import UserDto from '../dto/user.dto'
import { EntityTypes } from '../enums/entity.enum'
import AccountTypeEntity from './account-type.entity'
import GameHistoryEntity from './game-history.entity'
import ProfileEntity from './profile.entity'
import RoleEntity from './role.entity'

@Entity(EntityTypes.USER)
export default class UserEntity extends UserDto {
    @PrimaryColumn('uuid', { length: 36 })
    id: string

    @Column({
        type: 'varchar',
        nullable: false,
        default: 'dd',
    })
    username?: string

    @Column({
        type: 'varchar',
        nullable: true,
    })
    password?: string

    @Column({
        type: 'bigint',
        nullable: true,
    })
    createdDate?: number

    @Column({
        type: 'text',
        nullable: true,
    })
    token?: string

    @Column({
        type: 'varchar',
        nullable: true,
    })
    ban?: number
    @Column({
        type: 'varchar',
        nullable: true,
    })
    active?: number

    @Column({
        type: 'varchar',
        nullable: true,
        default: 0,
    })
    gold?: number

    @Column({
        type: 'varchar',
        nullable: true,
        default: 0,
    })
    diamond?: number

    @ManyToOne((type) => RoleEntity, (role) => role.id, {
        cascade: false,
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
        createForeignKeyConstraints: false,
    })
    @JoinColumn()
    role?: RoleEntity

    @OneToOne((type) => ProfileEntity, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn()
    profile: ProfileEntity

    @ManyToOne((type) => AccountTypeEntity, (accountType) => accountType.id, {
        cascade: false,
        onDelete: 'NO ACTION',
        onUpdate: 'RESTRICT',
    })
    @JoinColumn()
    accountType?: AccountTypeEntity

    @OneToMany(
        (type) => GameHistoryEntity,
        (gameHistoryEntity) => gameHistoryEntity.id,
        {
            cascade: false,
            onDelete: 'NO ACTION',
            onUpdate: 'CASCADE',
        }
    )
    @JoinColumn()
    gameHistories: GameHistoryEntity[]

    constructor(
        id?: string,
        username?: string,
        password?: string,
        email?: string,
        roleId?: number,
        accountType?: number,
        gold?: number,
        diamond?: number,
        token?: string,
        ban?: number
    ) {
        super(
            id,
            username,
            password,
            email,
            roleId,
            accountType,
            gold,
            diamond,
            ban,
            token
        )

        this.createdDate = new Date().getTime()
    }
}
