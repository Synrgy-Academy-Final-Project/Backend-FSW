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
      .select('ts.company_name as airlineName')
      .count('ts.id as totalSoldout')
      .groupBy('ts.company_name')
      .orderBy('totalSoldout', 'desc')
      .whereNotNull('ts.company_name')
      .whereNull('ts.deleted_date')
      .from('transactions as ts')
      .throwIfNotFound()
  }

  public findTheMostSoldoutAirplanes = async (): Promise<TransactionsModel[]> => {
    return await TransactionsModel.query()
      .select('ts.airplane_name as airplineName')
      .count('ts.id as totalSoldout')
      .groupBy('ts.airplane_name')
      .orderBy('totalSoldout', 'desc')
      .whereNotNull('ts.airplane_name')
      .whereNull('ts.deleted_date')
      .from('transactions as ts')
      .throwIfNotFound()
  }
}
