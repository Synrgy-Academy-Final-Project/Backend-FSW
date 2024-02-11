import { PaymentService } from '../service/payments'
import type { Request, Response } from 'express'

export class PaymentController {
  readonly paymentService: PaymentService

  public constructor() {
    this.paymentService = new PaymentService()
  }

  public getTransactionPayments = async (
    _: Request,
    res: Response
  ): Promise<Response<unknown, Record<string, unknown>>> => {
    try {
      const transactionPayments = await this.paymentService.getTransactionPayments()
      return res.status(200).json({
        status: 200,
        message: 'Successfully retrieved transaction payments',
        data: transactionPayments,
      })
    } catch (err: unknown) {
      console.error(err)
      return res.status(500).json({ status: 500, message: 'Internal Server Error' })
    }
  }
}
