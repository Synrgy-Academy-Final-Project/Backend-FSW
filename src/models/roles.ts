import { Model } from 'objection'
import type { JSONSchema, ModelObject, RelationMappings, RelationMappingsThunk } from 'objection'
import { UsersModel } from './users'

export class RolesModel extends Model {
  id!: string
  name!: string
  created_date!: EpochTimeStamp
  updated_date!: EpochTimeStamp
  deleted_date!: EpochTimeStamp

  static readonly tableName = 'roles'
  // validasi http request body
  static get jsonSchema(): JSONSchema {
    return {
      type: 'object',
      required: ['name'],
    }
  }

  static relationMappings: RelationMappings | RelationMappingsThunk = {
    users: {
      relation: Model.HasOneRelation,
      modelClass: UsersModel,
      join: {
        from: 'roles.id',
        to: 'users.id_role',
      },
    },
  }
}

export type Roles = ModelObject<RolesModel>
