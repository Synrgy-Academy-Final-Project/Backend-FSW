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

  public getTheMostSoldoutAirlines = async (): Promise<TransactionAirlines[] | unknown> => {
    const results = await this.transactionRepository.findTheMostSoldoutAirlines()

    const airlines = {}

    for (const result of results) {
      // @ts-expect-error object airlines is not added type
      if (airlines[result.airlineName] === undefined) {
        // @ts-expect-error object airlines is not added type
        airlines[result.airlineName] = {
          airlineName: result.airlineName,
          totalSoldout: 0,
          airplanes: [],
        }
      }

      // @ts-expect-error object airlines is not added type
      airlines[result.airlineName].totalSoldout += Number(result.totalSoldoutAirline)
      // @ts-expect-error object airlines is not added type
      airlines[result.airlineName].airplanes.push({
        airplaneName: result.airplaneName,
        totalSoldout: Number(result.totalSoldoutAirplane),
      })
    }

    const finalResults = Object.values(airlines)

    return finalResults
  }
}
