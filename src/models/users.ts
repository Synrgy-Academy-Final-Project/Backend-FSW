import type { UUID } from 'crypto'
import { Model } from 'objection'
import type { JSONSchema, ModelObject } from 'objection'
import { RolesModel } from './roles'
import { UsersDetailsModel } from './usersDetails'

export class UsersModel extends Model {
    id!: UUID
    email!: string
    full_name!: string
    password!: string
    role_id!: string
    user_detail_id!: UUID
    otp!: string
    active!: boolean
    otp_generated_time!: EpochTimeStamp
    created_date!: EpochTimeStamp
    updated_date!: EpochTimeStamp

    // type for join table or relationship
    role_name!: string

    static readonly tableName = 'users'

    // validasi http request body
    static get jsonSchema(): JSONSchema {
        return {
            type: 'object',
            required: ['email', 'password'],
            properties: {
                email: { type: 'string', minLength: 3 },
                password: { type: 'string', minLength: 6 },
            },
        }
    }

    static relationMappings = {
        roles: {
            relation: Model.BelongsToOneRelation,
            modelClass: RolesModel,
            join: {
                from: 'users.role_id',
                to: 'roles.id',
            },
        },
        users_details: {
            relation: Model.BelongsToOneRelation,
            modelClass: UsersDetailsModel,
            join: {
                from: 'users.user_detail_id',
                to: 'users_details.id',
            },
        },
    }
}

export type Users = ModelObject<UsersModel>
