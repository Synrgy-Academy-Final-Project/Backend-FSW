import { AirportService } from '../service/airports'
import type { Request, Response } from 'express'

export class AirportController {
  // set readonly untuk variabel airportService dan types AirportService
  readonly airportService: AirportService
  // constructor untuk inisialisasi object dari airportService
  public constructor() {
    this.airportService = new AirportService()
  }

  // method untuk mendapatkan list airport

  public getListAirport = async (_: Request, res: Response): Promise<Response<unknown, Record<string, unknown>>> => {
    try {
      // mendapatkan semua data bandara
      const airports = await this.airportService.getListAirport()
      // kirim response dengan status 200 dan data bandara
      return res.status(200).json(airports)
      //   jika terjadi error
    } catch (err: unknown) {
      // menampilkan error di console
      console.error(err)
      //   kirim response dengan status 500 dan pesan error internal server
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}
