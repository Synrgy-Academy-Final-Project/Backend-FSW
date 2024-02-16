/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Request, Response } from 'express'
import { BasePriceDateService } from '../service/basePriceDates'
import { v4 as uuidv4 } from 'uuid'
import type { IReqBody, IReqParams } from '../utils/types'

export class BasePriceDatesController {
  // variable hanya bisa di instance oleh class base price date service
  readonly basePriceDateService: BasePriceDateService

  public constructor() {
    // instance base price date service
    this.basePriceDateService = new BasePriceDateService()
  }

  // method menyimpan base price date

  public saveBasePriceDate = async (
    req: Request<unknown, unknown, IReqBody>,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> => {
    try {
      // mengambil data dari req body / payload
      let { dateOfDeparture, dayCategory, price } = req.body
      // mengubah tanggal menjadi string
      dateOfDeparture = new Date(dateOfDeparture).toISOString()
      // membuat id dengan type uuid
      const id: string = uuidv4()
      // membuat tanggal saat base price date dibuat
      const createdDate: Date = new Date()
      const updatedDate: Date = new Date()
      // variable untuk mengecek duplicate
      let duplicateBasePriceDate: boolean = false
      // mendapatkan semua data base price date
      const basePriceDates = await this.basePriceDateService.getAllBasePriceDate()
      // mengecek jika data nya ada
      if (basePriceDates.length > 0) {
        // kalo ada maka looping data nya
        for (const basePriceDate of basePriceDates) {
          // mengecek jika tanggal nya sama dan kategori hari nya sama yang di kirim client
          // dan di database
          if (
            basePriceDate.dateOfDeparture.toISOString() === dateOfDeparture &&
            basePriceDate.dayCategory === dayCategory
          ) {
            // set variable duplicate menjadi true
            duplicateBasePriceDate = true
            // hentikan looping
            break
          }
        }
      }
      // menampilkan ke console untuk mengecek duplicate
      console.log('duplicate create baseprice date:', duplicateBasePriceDate)
      // jika variable duplicate nya true
      if (duplicateBasePriceDate) {
        // kirim response 409 bahwa duplicate tanggal dan kategori hari nya
        return res.status(409).json({
          status: 409,
          message: 'Duplicate Date and Day Category',
        })
      }
      //   menyimpan data base price
      const result = await this.basePriceDateService.saveBasePriceDate(
        id,
        dateOfDeparture as unknown as Date,
        dayCategory,
        price,
        createdDate,
        updatedDate
      )

      res.status(201).json({
        status: 201,
        message: 'success',
        data: [
          {
            id: result.id,
            dateOfDeparture: result.date_time,
            dayCategory: result.type,
            price: result.date_price,
            createdDate: result.created_date,
            updatedDate: result.updated_date,
          },
        ],
      })
    } catch (error: any) {
      console.error(error)

      res.status(500).json({ status: 500, message: 'Internal Server Error' })
    }
  }

  // method mendapatkan semua base price date

  public getAllBasePriceDate = async (
    _: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> => {
    try {
      // mengambil semua data base price date
      const results = await this.basePriceDateService.getAllBasePriceDate()
      // jika tidak ada data maka throw error
      if (results.length === 0) throw new Error()

      res.status(200).json({
        status: 200,
        message: 'success',
        data: results,
      })
      // jika terjadi error
    } catch (error: any) {
      // tampilkan error di console
      console.error(error)
      // jika error status nya 404
      if (error.statusCode === 404) {
        // kirim response 404 bahwa data tidak ditemukan
        return res.status(404).json({
          status: 404,
          message: 'Base Price Dates Not Found',
          data: [],
        })
      }

      res.status(500).json({ status: 500, message: 'Internal Server Error' })
    }
  }

  // mengambil data base price date by id

  public getBasePriceDateById = async (
    req: Request<IReqParams>,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> => {
    try {
      // mendapatkan id dari params
      const { id } = req.params
      // mendapatkan data base price berdasarkan id dari params
      const result = await this.basePriceDateService.getBasePriceDateById(id)

      res.status(200).json({
        status: 200,
        message: 'success',
        data: {
          id: result.id,
          dateOfDeparture: result.date_time,
          dayCategory: result.type,
          price: result.date_price,
          createdDate: result.created_date,
          updatedDate: result.updated_date,
        },
      })
      // jika terjadi error
    } catch (error: any) {
      // tampilkan error di console
      console.error(error)
      // jika error status nya 404
      if (error.statusCode === 404) {
        // kirim response status 404 bahwa id base price date tidak ditemukan
        return res.status(404).json({
          status: 404,
          message: 'ID Base Price Date Not Found',
        })
      }

      res.status(500).json({ status: 500, message: 'Internal Server Error' })
    }
  }

  // update data base price date

  public updateBasePriceDate = async (
    req: Request<IReqParams, unknown, IReqBody>,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> => {
    try {
      // mengambil id dari params
      const { id } = req.params
      // mengambil data dari req body
      let { dateOfDeparture, dayCategory, price } = req.body
      // mengubah date menjadi string
      dateOfDeparture = new Date(dateOfDeparture).toISOString()
      // update date saat data di ubah
      const updatedDate = new Date()
      // variable untuk mengecek duplicate date
      let duplicateBasePriceDate: boolean = false
      // get semua data base price
      const basePriceDates = await this.basePriceDateService.getAllBasePriceDate()
      // get data base price berdasarkan id params
      const basePriceDateById = await this.basePriceDateService.getBasePriceDateById(id)
      // jika data nya ada
      if (basePriceDates.length > 0) {
        // maka lakukan perulangan
        for (const basePriceDate of basePriceDates) {
          // jika date dari client dan di database sama dan kategori hari sama dan id nya beda dari database maka duplicate
          if (
            basePriceDate.dateOfDeparture.toISOString() === dateOfDeparture &&
            basePriceDate.dayCategory === dayCategory &&
            basePriceDate.id !== basePriceDateById.id
          ) {
            // set duplicate menjadi true
            duplicateBasePriceDate = true
            // hentikan perulangan
            break
          }
        }
      }
      // menampilkan ke console untuk duplicate atau tidak
      console.log('duplicate update baseprice date:', duplicateBasePriceDate)
      // jika duplicate
      if (duplicateBasePriceDate) {
        // kirim response 409 bahwa data date dan kategori hari duplicate dengan di database
        return res.status(409).json({
          status: 409,
          message: 'Duplicate Date and Day Category',
        })
      }
      // call method untuk update data base price
      const result = await this.basePriceDateService.updateBasePriceDate(id, {
        date_time: dateOfDeparture as unknown as Date,
        type: dayCategory,
        date_price: price,
        updated_date: updatedDate,
      })

      res.status(200).json({
        status: 200,
        message: 'update base price date successfully',
        data: {
          id: result[0].id,
          dateOfDeparture: result[0].date_time,
          dayCategory: result[0].type,
          price: result[0].date_price,
          createdDate: result[0].created_date,
          updatedDate: result[0].updated_date,
        },
      })
      // jika terjadi error
    } catch (error: any) {
      // tampilkan error di console
      console.error(error)
      // jika error status 404
      if (error.statusCode === 404) {
        // kirim response 404 bahwa id base price tidak ditemukan
        return res.status(404).json({
          status: 404,
          message: 'ID Base Price Date Not Found',
        })
      }

      res.status(500).json({ status: 500, message: 'Internal Server Error' })
    }
  }

  // method untuk hapus data base price

  public deleteBasePriceDate = async (
    req: Request<IReqParams>,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> => {
    try {
      // mengambil id dari params
      const { id } = req.params
      // call service untuk hapus by id
      const result = await this.basePriceDateService.deleteBasePriceDate(id)
      // jika tidak ada id nya maka throw error
      if (result === 0) throw new Error()

      res.status(200).json({
        status: 200,
        message: 'delete base price date successfully',
      })
      // jika terjadi error
    } catch (error: any) {
      // tampilkan error di console
      console.error(error)
      // jika error status nya 404
      if (error.statusCode === 404) {
        // kirim response 404 bahwa id base price tidak ditemukan
        return res.status(404).json({
          status: 404,
          message: 'ID Base Price Date Not Found',
        })
      }

      res.status(500).json({ status: 500, message: 'Internal Server Error' })
    }
  }
}
