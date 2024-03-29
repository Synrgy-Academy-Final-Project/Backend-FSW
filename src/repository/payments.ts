import { raw } from 'objection'
import { PaymentsModel } from '../models/payments'

export class PaymentRepository {
  public findTransactionPayments = async (): Promise<PaymentsModel[]> => {
    return await PaymentsModel.query()
      .select(raw("TO_CHAR(transaction_time, 'Month') as month"), 'status_code', 'transaction_status')
      .count('transaction_id as transaction_count')
      .sum('gross_amount as transaction_amount')
      .groupBy(raw("TO_CHAR(transaction_time, 'Month'), status_code, transaction_status"))
      .throwIfNotFound()
  }
}
