/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Request, Response } from 'express'
import { BasePriceAirportService } from '../service/basePriceAirports'
import { AirportService } from '../service/airports'
import { v4 as uuidv4 } from 'uuid'
import type { BasePriceAirports } from '../models/basePriceAirports'
import type { IReqBody, IReqParams } from '../utils/types'

export class BasePriceAirportController {
  // set readonly untuk variabel basePriceAirportService dan types BasePriceAirportService
  readonly basePriceAirportService: BasePriceAirportService
  // set readonly untuk variabel airportService dan types AirportService
  readonly airportService: AirportService
  // constructor untuk inisialisasi object dari basePriceAirportService dan airportService
  public constructor() {
    this.basePriceAirportService = new BasePriceAirportService()
    this.airportService = new AirportService()
  }

  // method untuk menyimpan base price airport

  public saveBasePriceAirport = async (
    req: Request<unknown, unknown, IReqBody>,
    res: Response
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      // mendapatkan data dari body request
      const { fromAirportId, toAirportId, duration, price } = req.body
      // validasi jika fromAirportId sama dengan toAirportId
      if (fromAirportId === toAirportId) {
        // jika sama maka kirim response status 400
        return res.status(400).json({
          status: 400,
          message: 'From City and To City must be different',
        })
      }
      // membuat id dengan menggunakan uuidv4
      const id: string = uuidv4()
      // mendapatkan data airport berdasarkan fromAirportId
      const fromAirport = await this.airportService.getAirportById(fromAirportId)
      // mendapatkan code dari from airport
      const { code: departureCode } = fromAirport
      // mendapatkan data airport berdasarkan toAirportId
      const toAirport = await this.airportService.getAirportById(toAirportId)
      // mendapatkan code dari to airport
      const { code: arrivalCode } = toAirport
      // mendapatkan tanggal sekarang
      const createdDate = new Date()
      const updatedDate = new Date()
      // variable untuk mengecek duplicate base price airport
      let duplicateBasePriceAirport: boolean = false
      // mendapatkan semua data base price airport
      const basePriceAirports = await this.basePriceAirportService.getAllBasePriceAirport()
      // jika ada data base price airport
      if (basePriceAirports.length > 0) {
        // lakukan perulangan untuk setiap base price airport
        for (const basePriceAirport of basePriceAirports) {
          // membuat validasi untuk data yang sama dengan yang dikirim client dan database
          if (basePriceAirport.fromAirportId === fromAirportId && basePriceAirport.toAirportId === toAirportId) {
            // maka set duplicate nya jadi true
            duplicateBasePriceAirport = true
            // hentikan perulangan
            break
          }
        }
      }
      // mengirim console log untuk melihat hasil dari validasi
      console.log('duplicate create baseprice airport:', duplicateBasePriceAirport)
      // jika duplicateBasePriceAirport bernilai true
      if (duplicateBasePriceAirport) {
        // maka kirim response status 409
        return res.status(409).json({
          status: 409,
          message: 'Duplicate From City and To City',
        })
      }
      // menyimpan base price airport
      const basePriceAirport = await this.basePriceAirportService.saveBasePriceAirport(
        id,
        fromAirportId,
        toAirportId,
        departureCode,
        arrivalCode,
        duration,
        price,
        createdDate,
        updatedDate
      )
      // kirim response status 201
      return res.status(201).json({
        status: 201,
        message: 'success',
        data: {
          id: basePriceAirport.id,
          fromAirportId: basePriceAirport.from_airport_id,
          toAirportId: basePriceAirport.to_airport_id,
          departureCode: basePriceAirport.departure_code,
          arrivalCode: basePriceAirport.arrival_code,
          duration: basePriceAirport.duration,
          price: basePriceAirport.airport_price,
          createdDate: basePriceAirport.created_date,
          updatedDate: basePriceAirport.updated_date,
        },
      })
      // jika terjadi error
    } catch (error) {
      // kirim error ke console
      console.error(error)

      return res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
      })
    }
  }

  // method untuk mendapatkan semua base price airport

  public getAllBasePriceAirport = async (_: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      // mendapatkan semua data base price airport
      const allBasePriceAirport = await this.basePriceAirportService.getAllBasePriceAirport()
      // jika data base price airport tidak ditemukan throw error
      if (allBasePriceAirport === undefined) throw new Error()
      // kirim response status 200
      return res.status(200).json({
        status: 200,
        message: 'success',
        data: allBasePriceAirport,
      })
      // jika terjadi error
    } catch (error: any) {
      // kirim error ke console
      console.error(error)
      // jika error status code nya 404
      if (error.statusCode === 404) {
        // kirim response status 404
        return res.status(404).json({
          status: 404,
          message: 'Base Price Airport Not Found',
          data: [],
        })
      }

      return res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
      })
    }
  }

  // method untuk mendapatkan base price airport berdasarkan id

  public getBasePriceAirportById = async (
    req: Request<IReqParams>,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> => {
    try {
      // mendapatkan id dari params request
      const { id } = req.params
      // mendapatkan data base price airport berdasarkan id
      const basePriceAirport = await this.basePriceAirportService.getBasePriceAirportById(id)
      // jika data base price airport tidak ditemukan throw error
      if (basePriceAirport === undefined) throw new Error()
      // kirim response status 200
      return res.status(200).json({
        status: 200,
        message: 'success',
        data: basePriceAirport,
      })
      // jika terjadi error
    } catch (error: any) {
      // kirim error ke console
      console.error(error)
      // jika error status code nya 404
      if (error.statusCode === 404) {
        // kirim response status 404
        return res.status(404).json({
          status: 404,
          message: 'ID Base Price Airport Not Found',
        })
      }

      return res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
      })
    }
  }

  // method untuk update base price airport

  public updateBasePriceAirport = async (
    req: Request<IReqParams, unknown, IReqBody>,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> => {
    try {
      // mendapatkan id dari params request
      const { id } = req.params
      // mendapatkan data dari body request
      const { fromAirportId, toAirportId, duration, price }: Partial<BasePriceAirports> = req.body
      // mendapatkan airport berdasarkan from airport id
      const fromAirport = await this.airportService.getAirportById(fromAirportId)
      // mendapatkan code dari from airport
      const { code: departureCode } = fromAirport
      // mendapatkan airport berdasarkan to airport id
      const toAirport = await this.airportService.getAirportById(toAirportId)
      // mendapatkan code dari to airport
      const { code: arrivalCode } = toAirport
      // membuat tanggal baru saat data di update
      const updatedDate = new Date()
      // variable untuk mengecek duplicate data dari db
      let duplicateBasePriceAirport: boolean = false
      // mendapatkan semua data base price airport
      const basePriceAirports = await this.basePriceAirportService.getAllBasePriceAirport()
      // mendapatkan data base price airport berdasarkan id
      const basePriceAirportById = await this.basePriceAirportService.getBasePriceAirportById(id)
      // jika data base price airpot ada
      if (basePriceAirports.length > 0) {
        // lakukan perulangan untuk setiap base price airport
        for (const basePriceAirport of basePriceAirports) {
          // jika data yang dikirim client sama dengan data yang ada di database
          // dan id di db nya tidak sama dengan id yang dikirim client
          if (
            basePriceAirport.fromAirportId === fromAirportId &&
            basePriceAirport.toAirportId === toAirportId &&
            basePriceAirport.id !== basePriceAirportById.id
          ) {
            // maka set duplicate nya jadi true
            duplicateBasePriceAirport = true
            // hentikan perulangan
            break
          }
        }
      }
      // kirim console log untuk melihat hasil dari validasi
      console.log('duplicate update baseprice airport:', duplicateBasePriceAirport)
      // jika variable duplicate true
      if (duplicateBasePriceAirport) {
        // kirim response 409 bahwa data from city dan to city sudah ada
        return res.status(409).json({
          status: 409,
          message: 'Duplicate From City and To City',
        })
      }
      // lakukan update by id
      const basePriceAirport = await this.basePriceAirportService.updateBasePriceAirport(id, {
        from_airport_id: fromAirportId,
        to_airport_id: toAirportId,
        departure_code: departureCode,
        arrival_code: arrivalCode,
        duration,
        airport_price: price,
        updated_date: updatedDate,
      })
      // mengirim response 200 data berhasil di update
      return res.status(200).json({
        status: 200,
        message: 'update base price airport successfully',
        data: {
          id: basePriceAirport[0].id,
          fromAirportId: basePriceAirport[0].from_airport_id,
          toAirportId: basePriceAirport[0].to_airport_id,
          departureCode: basePriceAirport[0].departure_code,
          arrivalCode: basePriceAirport[0].arrival_code,
          duration: basePriceAirport[0].duration,
          price: basePriceAirport[0].airport_price,
          createdDate: basePriceAirport[0].created_date,
          updatedDate: basePriceAirport[0].updated_date,
        },
      })
      // jika terjadi error
    } catch (error: any) {
      // kirim error ke console
      console.error(error)
      // jika error status nya 404
      if (error.statusCode === 404) {
        // kirim response 404 bahwa id base price airport tidak ditemukan
        return res.status(404).json({
          status: 404,
          message: 'ID Base Price Airport Not Found',
        })
      }

      return res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
      })
    }
  }

  // method hapus data base price airport

  public deleteBasePriceAirport = async (
    req: Request<IReqParams>,
    res: Response
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      // ambil id dari request params
      const { id } = req.params
      // hapus berdasarkan id
      const basePriceAirport = await this.basePriceAirportService.deleteBasePriceAirport(id)
      // jika gagal hapus throw error
      if (basePriceAirport === 0) throw new Error()
      // jika tidak langsung kirim response 200
      return res.status(200).json({
        status: 200,
        message: 'delete airport successfully',
      })
      // jika terjadi error
    } catch (error: any) {
      // kirim erorr ke console
      console.error(error)
      // jika eror nya 404
      if (error.statusCode === 404) {
        // kirim response status 404 bahwa id base price airport tidak ditemukan
        return res.status(404).json({
          status: 404,
          message: 'ID Base Price Airport Not Found',
        })
      }

      return res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
      })
    }
  }
}
