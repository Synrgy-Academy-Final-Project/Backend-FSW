import { Model } from 'objection'
import type { ModelObject, RelationMappings, RelationMappingsThunk } from 'objection'
import { UsersModel } from './users'
import { PaymentsModel } from './payments'
import { AirplanesModel } from './airplanes'

export class TransactionsModel extends Model {
  id!: string
  user_id!: string
  url!: string
  airplane_id!: string
  airplane_name!: string
  airplane_code!: string
  airplane_class_id!: string
  airplane_class!: string
  departure_code!: string
  departure_date!: Date
  departure_time!: Date
  arrival_code!: string
  arrival_date!: Date
  arrival_time!: Date
  promotion_id!: string
  total_seat!: number
  total_price!: number
  created_date!: Date
  updated_date!: Date
  deleted_date!: Date

  static readonly tableName = 'transactions'

  static relationMappings: RelationMappings | RelationMappingsThunk = {
    users: {
      relation: Model.BelongsToOneRelation,
      modelClass: UsersModel,
      join: {
        from: 'transactions.user_id',
        to: 'users.id',
      },
    },
    airplanes: {
      relation: Model.BelongsToOneRelation,
      modelClass: AirplanesModel,
      join: {
        from: 'transactions.airplane_id',
        to: 'airplanes.id',
      },
    },
    payments: {
      relation: Model.HasOneRelation,
      modelClass: PaymentsModel,
      join: {
        from: 'transactions.id',
        to: 'payments.transaction_id',
      },
    },
  }
}

export type Transactions = ModelObject<TransactionsModel>
