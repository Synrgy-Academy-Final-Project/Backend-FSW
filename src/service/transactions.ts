import type { TransactionsModel } from '../models/transactions'
import { TransactionRepository } from '../repository/transactions'
import type { TransactionByAirline } from '../utils/types'

export class TransactionService {
  readonly transactionRepository: TransactionRepository

  public constructor() {
    this.transactionRepository = new TransactionRepository()
  }

  public getReportTransaction = async (): Promise<TransactionsModel[]> => {
    return await this.transactionRepository.findReportTransaction()
  }

  public getTheMostSoldoutAirlines = async (): Promise<TransactionsModel[] | unknown> => {
    const results = await this.transactionRepository.findTheMostSoldoutAirlines()

    const airlines: TransactionByAirline = {}

    for (const result of results) {
      const airlineName = result.airlineName

      if (airlines[airlineName] === undefined) {
        airlines[airlineName] = {
          airlineName,
          totalSoldout: 0,
          airplanes: [],
        }
      }

      airlines[airlineName].totalSoldout += Number(result.totalSoldoutAirline)
      airlines[airlineName].airplanes.push({
        airplaneName: result.airplaneName,
        totalSoldout: Number(result.totalSoldoutAirplane),
      })
    }

    const finalResults = Object.values(airlines)

    return finalResults
  }
}
