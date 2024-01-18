import type { UUID } from 'crypto'
import { Model } from 'objection'
import type { ModelObject, RelationMappings, RelationMappingsThunk } from 'objection'
import { UsersModel } from './users'
import { PaymentsModel } from './payments'

export class TransactionsModel extends Model {
    id!: UUID
    user_id!: UUID
    flight1_id!: UUID
    flight2_id!: UUID
    total_seat!: number
    promotion_id!: UUID
    total_price!: number
    created_date!: EpochTimeStamp
    updated_date!: EpochTimeStamp
    deleted_date!: EpochTimeStamp

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
