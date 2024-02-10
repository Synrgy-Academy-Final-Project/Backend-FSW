import type { UUID } from 'crypto'
import { Model } from 'objection'
import type { ModelObject, RelationMappings, RelationMappingsThunk } from 'objection'
import { TransactionsModel } from './transactions'

export class PaymentsModel extends Model {
  id!: UUID
  transaction_time!: string
  transaction_status!: string
  transaction_id!: string
  status_message!: string
  status_code!: string
  signature_key!: string
  payment_type!: string
  order_id!: string
  merchant_id!: string
  gross_amount!: string
  fraud_status!: string
  currency!: string
  settlement_time!: string
  bank!: string
  store!: string
  va_number!: string
  created_date!: EpochTimeStamp
  updated_date!: EpochTimeStamp
  deleted_date!: EpochTimeStamp

  // types alias
  month!: string
  transaction_count!: number
  transaction_amount!: number

  static readonly tableName = 'payments'

  static relationMappings: RelationMappings | RelationMappingsThunk = {
    transactions: {
      relation: Model.BelongsToOneRelation,
      modelClass: TransactionsModel,
      join: {
        from: 'payments.transaction_id',
        to: 'transactions.id',
      },
    },
  }
}

export type Payments = ModelObject<PaymentsModel>
