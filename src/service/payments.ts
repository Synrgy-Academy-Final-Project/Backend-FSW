import type { PaymentsModel } from '../models/payments'
import { PaymentRepository } from '../repository/payments'

export class PaymentService {
  readonly paymentRepository: PaymentRepository

  public constructor() {
    this.paymentRepository = new PaymentRepository()
  }

  public getTransactionPayments = async (): Promise<PaymentsModel[] | unknown> => {
    const results = await this.paymentRepository.findTransactionPayments()

    const transactionsByMonth = {}

    for (const result of results) {
      const month = result.month.trim()
      // @ts-expect-error object airlines is not added type
      if (transactionsByMonth[month] === undefined) {
        // @ts-expect-error object airlines is not added type
        transactionsByMonth[month] = []
      }

      // @ts-expect-error object airlines is not added type
      transactionsByMonth[month].push({
        statusCode: result.status_code,
        transactionStatus: result.transaction_status,
        transactionCount: Number(result.transaction_count),
        transactionAmount: Number(result.transaction_amount),
      })
    }

    return transactionsByMonth
  }
}
