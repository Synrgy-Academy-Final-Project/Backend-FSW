import { Model } from 'objection'
import type { ModelObject, RelationMappings, RelationMappingsThunk } from 'objection'
import { UsersModel } from './users'

export class UsersDetailsModel extends Model {
  id!: string
  first_name!: string
  last_name!: string
  address!: string
  gender!: string
  phone_number!: string
  visa!: string
  passport!: string
  resident_permit!: string
  nik!: string
  created_date!: Date
  updated_date!: Date
  deleted_date!: Date

  static readonly tableName = 'users_details'

  static relationMappings: RelationMappings | RelationMappingsThunk = {
    users: {
      relation: Model.HasOneRelation,
      modelClass: UsersModel,
      join: {
        from: 'users_details.id',
        to: 'users.user_detail_id',
      },
    },
  }
}

export type UsersDetails = ModelObject<UsersDetailsModel>
