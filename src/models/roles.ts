import type { UUID } from 'crypto'
import { Model } from 'objection'
import type { JSONSchema, ModelObject } from 'objection'
import { UsersModel } from './users'

export class RolesModel extends Model {
    id!: UUID
    name!: string
    created_date!: EpochTimeStamp
    updated_date!: EpochTimeStamp

    static readonly tableName = 'roles'
    // validasi http request body
    static get jsonSchema(): JSONSchema {
        return {
            type: 'object',
            required: ['name'],
        }
    }

    static relationMappings = {
        users: {
            relation: Model.HasOneRelation,
            modelClass: UsersModel,
            join: {
                from: 'roles.id',
                to: 'users.role_id',
            },
        },
    }
}

export type Roles = ModelObject<RolesModel>
