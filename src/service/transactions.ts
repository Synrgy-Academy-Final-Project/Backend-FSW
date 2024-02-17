import type { TransactionsModel } from '../models/transactions'
import { TransactionRepository } from '../repository/transactions'
import type { TransactionByAirline } from '../utils/types'

export class TransactionService {
  // membuat variable readonly dan hanya bisa di instance oleh transaction repository
  readonly transactionRepository: TransactionRepository

  public constructor() {
    this.transactionRepository = new TransactionRepository()
  }

  // method untuk mendapatkan laporan transaksi

  public getReportTransaction = async (): Promise<TransactionsModel[]> => {
    return await this.transactionRepository.findReportTransaction()
  }

  // method untuk mendapatkan maskapai paling banyak di pesan

  public getTheMostSoldoutAirlines = async (): Promise<TransactionsModel[] | unknown> => {
    const results = await this.transactionRepository.findTheMostSoldoutAirlines()
    // membuat objek kosong untuk menampung semua key value yang dibutuhkan oleh client
    const airlines: TransactionByAirline = {}
    // loop data
    for (const result of results) {
      // mendapatkan nama maskapai
      const airlineName = result.airlineName
      // jika key pada objek airlines undefined
      if (airlines[airlineName] === undefined) {
        // membuat objek baru pada key airlineName
        airlines[airlineName] = {
          airlineName,
          totalSoldout: 0,
          airplanes: [],
        }
      }
      // menjumlahkan total maskapai yang di pesan
      airlines[airlineName].totalSoldout += Number(result.totalSoldoutAirline)
      // mengirim data objek dengan key value pada array airplanes
      airlines[airlineName].airplanes.push({
        airplaneName: result.airplaneName,
        totalSoldout: Number(result.totalSoldoutAirplane),
      })
    }
    // mendapatkan value dari object airlines
    const finalResults = Object.values(airlines)

    return finalResults
  }
}
