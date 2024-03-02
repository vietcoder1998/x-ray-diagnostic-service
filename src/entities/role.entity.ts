import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { EntityTypes } from '../enums/entity.enum'
import Role from '../dto/role.dto'
import ApiEntity from './api.entity'
import UserEntity from './user.entity'
import RoleDto from '../dto/role.dto'

@Entity(EntityTypes.ROLE)
export default class RoleEntity extends RoleDto {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar',
    })
    name?: string

    @Column({
        type: 'text',
    })
    description?: string

    @ManyToMany((api) => ApiEntity, (api) => api.roles, {
        cascade: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    })
    apis: ApiEntity[]

    @ManyToOne((user) => UserEntity, (user) => user.role, {
        cascade: true,
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
    })
    users: UserEntity[]
}
