import type { TransactionsModel } from '../models/transactions'
import { TransactionRepository } from '../repository/transactions'
import type { TransactionAirlines } from '../utils/types'

export class TransactionService {
  readonly transactionRepository: TransactionRepository

  public constructor() {
    this.transactionRepository = new TransactionRepository()
  }

  public getReportTransaction = async (): Promise<TransactionsModel[]> => {
    return await this.transactionRepository.findReportTransaction()
  }

  public getTheMostSoldoutAirlines = async (): Promise<TransactionsModel[]> => {
    return await this.transactionRepository.findTheMostSoldoutAirlines()
  }

  public getTheMostSoldoutAirline = async (): Promise<TransactionAirlines[]> => {
    const results = await this.transactionRepository.findTheMostSoldoutAirlines()

    const data = []

    for (const result of results) {
      data.push({
        airlineName: result.airlineName,
        totalSoldout: result.totalSoldoutAirline,
        airplanes: [
          {
            airplaneName: result.airplaneName,
            totalSoldout: result.totalSoldoutAirplane,
          },
        ],
      })
    }

    return data
  }
}
