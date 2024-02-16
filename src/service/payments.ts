import type { PaymentsModel } from '../models/payments'
import { PaymentRepository } from '../repository/payments'
import type { TransactionByMonth } from '../utils/types'

export class PaymentService {
  readonly paymentRepository: PaymentRepository

  public constructor() {
    this.paymentRepository = new PaymentRepository()
  }

  public getTransactionPayments = async (): Promise<PaymentsModel[] | unknown> => {
    const results = await this.paymentRepository.findTransactionPayments()

    const transactionsByMonth: TransactionByMonth = {}

    for (const result of results) {
      const month = result.month.trim()
      if (transactionsByMonth[month] === undefined) {
        transactionsByMonth[month] = []
      }

      transactionsByMonth[month].push({
        statusCode: Number(result.status_code),
        transactionStatus: result.transaction_status,
        transactionCount: Number(result.transaction_count),
        transactionAmount: Number(result.transaction_amount),
      })
    }

    return transactionsByMonth
  }
}
