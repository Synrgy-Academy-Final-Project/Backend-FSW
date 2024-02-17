import type { PaymentsModel } from '../models/payments'
import { PaymentRepository } from '../repository/payments'
import type { TransactionByMonth } from '../utils/types'

export class PaymentService {
  // membuat variable readonly dan hanya bisa di instance oleh payment repository
  readonly paymentRepository: PaymentRepository

  public constructor() {
    this.paymentRepository = new PaymentRepository()
  }

  // fungsi mendapatkan semua transaksi pembayaran

  public getTransactionPayments = async (): Promise<PaymentsModel[] | unknown> => {
    // mencari transaksi pembayaran
    const results = await this.paymentRepository.findTransactionPayments()
    // membuat objek kosong untuk menampung semua key value yang dibutuhkan oleh client
    const transactionsByMonth: TransactionByMonth = {}
    // loop data
    for (const result of results) {
      // menghilangkan spasi
      const month = result.month.trim()
      // jika value dari key month nya kosong
      if (transactionsByMonth[month] === undefined) {
        // membuat array kosong
        transactionsByMonth[month] = []
      }
      // mengirim data objek dengan key value pada array month
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
