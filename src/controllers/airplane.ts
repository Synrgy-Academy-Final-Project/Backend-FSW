/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Request, Response } from 'express'
import { AirplaneService } from '../service/airplanes'
import type { IReqBody, IReqParams } from '../utils/types'
import { v4 as uuidv4 } from 'uuid'
import { DataError, ForeignKeyViolationError } from 'objection'

export class AirplaneController {
  /**
   * membuat variable readonly untuk instance dari class service pesawat
   * sehingga instance dari class service pesawat tidak bisa diubah
   *  */
  readonly airplaneService: AirplaneService
  // membuat constructor untuk class AirplaneController
  public constructor() {
    // membuat instance dari class service pesawat
    this.airplaneService = new AirplaneService()
  }

  // fungsi membuat pesawat baru

  public createAirplane = async (
    req: Request<unknown, unknown, IReqBody>,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> => {
    try {
      // ambil data dari request body atau payload
      const { airplaneName, airplaneCode, airplanePrice, companyId } = req.body
      // ambil semua data pesawat
      const airplanes = await this.airplaneService.getAllAirplane()
      // jika data pesawat ada
      if (airplanes.length > 0) {
        // cari pesawat berdasarkan kode pesawat
        const isAirplaneExist = airplanes.find((airplane) => airplane.airplaneCode === airplaneCode)
        // jika pesawat sudah ada
        if (isAirplaneExist !== undefined) {
          // kirim response pesawat sudah ada
          return res.status(409).json({
            status: 409,
            message: 'Code airplane is already exist',
          })
        }
      }
      // membuat id pesawat
      const id: string = uuidv4()
      // membuat tanggal saat ini
      const createdDate: Date = new Date()
      const updatedDate: Date = new Date()
      // membuat pesawat baru
      const airplane = await this.airplaneService.createAirplane({
        id,
        name: airplaneName,
        code: airplaneCode,
        airplane_price: airplanePrice,
        company_id: companyId,
        created_date: createdDate,
        updated_date: updatedDate,
      })
      // kirim response pesawat berhasil dibuat
      return res.status(201).json({
        status: 201,
        message: 'Success create airplane',
        data: airplane,
      })
      // jika terjadi error
    } catch (error: any) {
      // tampilkan error di console
      console.error(error)
      // jika error merupakan DataError
      if (error instanceof DataError) {
        // kirim response bad request
        return res.status(400).json({
          status: 400,
          message: 'Bad Request',
        })
      }

      res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
      })
    }
  }

  // fungsi mendapatkan semua pesawat

  public getAllAirplane = async (
    _: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> => {
    try {
      // ambil semua data pesawat
      const airplanes = await this.airplaneService.getAllAirplane()
      // jika data pesawat tidak ada
      if (airplanes.length === 0) {
        // kirim response pesawat tidak ditemukan
        return res.status(404).json({
          status: 404,
          message: 'Airplanes Not Found',
          data: [],
        })
      }
      // kirim response pesawat berhasil didapatkan
      res.status(200).json({
        status: 200,
        message: 'Success get all airplane',
        data: airplanes,
      })
      // jika terjadi error
    } catch (error: any) {
      // tampilkan error di console
      console.error(error)

      res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
      })
    }
  }

  // fungsi mendapatkan pesawat berdasarkan id

  public getAirplaneById = async (
    req: Request<IReqParams>,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> => {
    try {
      // ambil id pesawat dari request params
      const { id } = req.params
      // ambil pesawat berdasarkan id
      const airplane = await this.airplaneService.getAirplaneById(id)
      // kirim response berhasil mendapatkan pesawat berdasarkan id
      res.status(200).json({
        status: 200,
        message: 'Success get airplane by id',
        data: airplane,
      })
      // jika terjadi error
    } catch (error: any) {
      console.error(error)
      // jika error merupakan DataError
      if (error instanceof DataError) {
        // kirim response bad request
        return res.status(400).json({
          status: 400,
          message: 'Bad Request',
        })
      }
      // jika error status code 404
      if (error.statusCode === 404) {
        // kirim response pesawat tidak ditemukan
        return res.status(404).json({
          status: 404,
          message: 'ID Airplane Not Found',
          data: [],
        })
      }

      res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
      })
    }
  }

  // fungsi update pesawat berdasarkan id

  public updateAirplaneById = async (
    req: Request<IReqParams, any, IReqBody>,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> => {
    try {
      // ambil id pesawat dari request params
      const { id } = req.params
      // ambil data pesawat dari request body atau payload
      const { airplaneName, airplaneCode, airplanePrice } = req.body
      // membuat tanggal saat ini
      const updatedDate: Date = new Date()
      // variable untuk mengecek apakah pesawat sudah ada
      let duplicateAirplane: boolean = false
      // ambil semua data pesawat
      const airplanes = await this.airplaneService.getAllAirplane()
      // ambil pesawat berdasarkan id
      const airplaneById = await this.airplaneService.getAirplaneById(id)
      // jika data pesawat ada
      if (airplanes.length > 0) {
        // perulangan untuk semua data pesawat
        for (const airplane of airplanes) {
          // jika kode pesawat sudah ada dan id pesawat tidak sama dengan id pesawat yang diupdate
          if (airplane.airplaneCode === airplaneCode && airplane.id !== airplaneById[0].id) {
            // set variable duplicateAirplane menjadi true
            duplicateAirplane = true
            // hentikan perulangan
            break
          }
        }
      }
      // kirim ke console untuk informasi duplicate update pesawat
      console.log('duplicate update airplane code:', duplicateAirplane)
      // jika pesawat sudah ada
      if (duplicateAirplane) {
        // kirim response code pesawat sudah ada
        return res.status(409).json({
          status: 409,
          message: 'Code airplane is already exist',
        })
      }
      // jika tidak duplicate code pesawat nya maka berhasil update pesawat berdasarkan id
      const airplane = await this.airplaneService.updateAirplaneById(id, {
        name: airplaneName,
        code: airplaneCode,
        airplane_price: airplanePrice,
        updated_date: updatedDate,
      })
      // kirim response pesawat berhasil diupdate
      res.status(200).json({
        status: 200,
        message: 'Success update airplane',
        data: airplane,
      })
      // jika terjadi error
    } catch (error: any) {
      // tampilkan error di console
      console.error(error)
      // jika error merupakan DataError
      if (error instanceof DataError) {
        // kirim response bad request
        return res.status(400).json({
          status: 400,
          message: 'Bad Request',
        })
      }
      // jika error status code 404
      if (error.statusCode === 404) {
        // kirim response id pesawat tidak ditemukan
        return res.status(404).json({
          status: 404,
          message: 'ID Airplane Not Found',
        })
      }

      res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
      })
    }
  }

  // fungsi delete pesawat berdasarkan id

  public deleteAirplaneById = async (
    req: Request<IReqParams>,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> => {
    try {
      // ambil id pesawat dari request params
      const { id } = req.params
      // hapus pesawat berdasarkan id
      const airplane = await this.airplaneService.deleteAirplaneById(id)
      // jika gagal delete pesawat maka throw error
      if (airplane === 0) throw new Error()
      // kirim response pesawat berhasil dihapus
      res.status(200).json({
        status: 200,
        message: 'Success delete airplane',
      })
      // jika terjadi error
    } catch (error: any) {
      // tampilkan error di console
      console.error(error)
      // jika error merupakan DataError
      if (error instanceof DataError) {
        // kirim response bad request
        return res.status(400).json({
          status: 400,
          message: 'Bad Request',
        })
      }
      // jika error status code 404
      if (error.statusCode === 404) {
        // kirim response id pesawat tidak ditemukan
        return res.status(404).json({
          status: 404,
          message: 'ID Airplane Not Found',
        })
      }
      // jika error merupakan ForeignKeyViolationError
      if (error instanceof ForeignKeyViolationError) {
        // kirim response pesawat tidak bisa dihapus karena id pesawat digunakan di tabel lain
        return res.status(409).json({
          status: 409,
          message: `Cannot delete airplane, this airplane ID is used in ${error.table}`,
        })
      }

      res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
      })
    }
  }
}
