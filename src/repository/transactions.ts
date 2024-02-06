import { TransactionsModel } from '../models/transactions'

export class TransactionRepository {
  public findReportTransaction = async (): Promise<TransactionsModel[]> => {
    return await TransactionsModel.query()
      .select(
        'ts.id',
        'ud.first_name',
        'ud.last_name',
        'ts.departure_code',
        'ts.arrival_code',
        'pm.transaction_time',
        'cp.name as airline',
        'ts.total_price',
        'pm.transaction_status'
      )
      .join('users as us', 'us.id', 'ts.user_id')
      .join('users_details as ud', 'ud.id', 'us.user_detail_id')
      .join('payments as pm', 'pm.transaction_id', 'ts.id')
      .join('airplanes as ap', 'ap.id', 'ts.airplane_id')
      .join('companies as cp', 'cp.id', 'ap.company_id')
      .whereNotNull('ts.departure_code')
      .whereNotNull('ts.arrival_code')
      .whereNot('pm.transaction_status', ['pending', 'expire'])
      .from('transactions as ts')
      .throwIfNotFound()
  }
}
