import { Model } from 'objection'
import type { ModelObject, RelationMappings, RelationMappingsThunk } from 'objection'
import { TransactionsModel } from './transactions'

export class TicketsModel extends Model {
  id!: string
  gate!: string
  seat!: string
  transaction_id!: string
  created_date!: Date
  updated_date!: Date
  deleted_date!: Date

  // type alias
  date?: Date
  total?: number

  static readonly tableName = 'tickets'

  static relationMappings: RelationMappings | RelationMappingsThunk = {
    // add relation mapping here
    Transactions: {
      relation: Model.BelongsToOneRelation,
      modelClass: TransactionsModel,
      join: {
        from: 'tickets.transaction_id',
        to: 'transactions.id',
      },
    },
  }
}

export type Tickets = ModelObject<TicketsModel>
