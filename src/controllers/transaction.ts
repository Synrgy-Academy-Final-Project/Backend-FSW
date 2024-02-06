import type { Request, Response } from 'express'
import { TransactionService } from '../service/transactions'

export class TransactionController {
  readonly transactionService: TransactionService

  public constructor() {
    this.transactionService = new TransactionService()
  }

  public getReportTransaction = async (_: Request, res: Response): Promise<void> => {
    try {
      const reportTransaction = await this.transactionService.getReportTransaction()

      res.json({
        status: 200,
        message: 'Success get report transaction',
        data: reportTransaction,
      })
    } catch (error) {
      console.error(error)

      res.json({
        status: 500,
        message: 'Internal Server Error',
      })
    }
  }
}
