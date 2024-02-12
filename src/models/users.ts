import { Model } from 'objection'
import type { JSONSchema, ModelObject, RelationMappings, RelationMappingsThunk } from 'objection'
import { RolesModel } from './roles'
import { UsersDetailsModel } from './usersDetails'
import { TransactionsModel } from './transactions'

export class UsersModel extends Model {
  id!: string
  email!: string
  password!: string
  id_role!: string
  user_detail_id!: string
  user_active!: boolean
  otp!: string
  otp_generated_time!: Date
  created_date!: Date
  updated_date!: Date
  deleted_date!: Date

  // types for join table or relationship
  role_name!: string
  first_name!: string
  last_name!: string

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

  static relationMappings: RelationMappings | RelationMappingsThunk = {
    roles: {
      relation: Model.BelongsToOneRelation,
      modelClass: RolesModel,
      join: {
        from: 'users.id_role',
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
    transactions: {
      relation: Model.HasOneRelation,
      modelClass: TransactionsModel,
      join: {
        from: 'users.id',
        to: 'transactions.user_id',
      },
    },
  }
}

export type Users = ModelObject<UsersModel>
