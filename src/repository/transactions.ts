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
        'ts.created_date as transaction_time',
        'ts.company_name as airline',
        'ts.total_price',
        'pm.transaction_status'
      )
      .join('users as us', 'us.id', 'ts.user_id')
      .join('users_details as ud', 'ud.id', 'us.user_detail_id')
      .join('payments as pm', 'pm.transaction_id', 'ts.id')
      .whereNotNull('ts.company_name')
      .whereNull('ts.deleted_date')
      .from('transactions as ts')
      .throwIfNotFound()
  }

  public findTheMostSoldoutAirlines = async (): Promise<TransactionsModel[]> => {
    return await TransactionsModel.query()
      .select('ts.company_name as airlineName', 'ts.airplane_name as airplaneName')
      .count('ts.company_name as totalSoldoutAirline')
      .count('ts.airplane_name as totalSoldoutAirplane')
      .groupBy('ts.company_name', 'ts.airplane_name')
      .orderBy('totalSoldoutAirline', 'desc')
      .whereNull('ts.deleted_date')
      .from('transactions as ts')
      .throwIfNotFound()
  }
}
