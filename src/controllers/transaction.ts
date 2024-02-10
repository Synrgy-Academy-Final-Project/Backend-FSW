/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Request, Response } from 'express'
import { TransactionService } from '../service/transactions'

export class TransactionController {
  readonly transactionService: TransactionService

  public constructor() {
    this.transactionService = new TransactionService()
  }

  public getReportTransaction = async (
    _: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> => {
    try {
      const reportTransaction = await this.transactionService.getReportTransaction()

      res.json({
        status: 200,
        message: 'Success get report transaction',
        data: reportTransaction,
      })
    } catch (error: any) {
      console.error(error)

      if (error.statusCode === 404) {
        return res.json({
          status: 404,
          message: 'Report transaction not found',
          data: [],
        })
      }

      res.json({
        status: 500,
        message: 'Internal Server Error',
      })
    }
  }

  public getTheMostSoldoutAirlines = async (
    _: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> => {
    try {
      const data = await this.transactionService.getTheMostSoldoutAirlines()

      res.json({
        status: 200,
        message: 'Success get the most soldout airlines',
        data,
      })
    } catch (error: any) {
      console.error(error)

      if (error.statusCode === 404) {
        return res.json({
          status: 404,
          message: 'Most soldout airlines not found',
          data: [],
        })
      }

      res.json({
        status: 500,
        message: 'Internal Server Error',
      })
    }
  }
}
