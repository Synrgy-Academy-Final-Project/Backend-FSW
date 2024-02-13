/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Request, Response } from 'express'
import type { IReqBody, IReqParams } from '../utils/types'
import { v4 as uuidv4 } from 'uuid'
import { DataError } from 'objection'
import { AirplaneClassService } from '../service/airplaneClasses'
import { AirplaneService } from '../service/airplanes'

export class AirplaneClassController {
  /**
   * membuat variable readonly untuk instance dari class service kelas pesawat dan service pesawat
   * sehingga instance dari class service kelas pesawat tidak bisa diubah
   *  */
  readonly airplaneClassService: AirplaneClassService
  readonly airplaneService: AirplaneService
  // membuat constructor untuk inisialisasi instance dari class service kelas pesawat dan service pesawat
  public constructor() {
    this.airplaneClassService = new AirplaneClassService()
    this.airplaneService = new AirplaneService()
  }

  // membuat fungsi untuk membuat kelas pesawat berdasarkan id pesawat

  public createAirplaneClass = async (
    req: Request<unknown, unknown, IReqBody>,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> => {
    try {
      // membuat variable untuk mengambil data dari body request atau data yang dikirimkan oleh client
      const { airplaneId, airplaneClassName, capacity, airplaneClassPrice } = req.body
      // membuat variable untuk mengambil semua data kelas pesawat
      const airplaneClasses = await this.airplaneClassService.getAllAirplaneClass()
      // jika data kelas pesawat ada
      if (airplaneClasses.length > 0) {
        // membuat variable untuk mengecek apakah kelas pesawat sudah ada atau belum
        let isAirplaneClassExist: boolean = false
        // melakukan perulangan untuk mengecek apakah kelas pesawat sudah ada atau belum
        for (const airplaneClass of airplaneClasses) {
          // jika nama kelas pesawat sama dengan di database dan id pesawat sama dengan di database
          if (airplaneClassName === airplaneClass.airplaneClassName && airplaneId === airplaneClass.airplaneId) {
            // maka kelas pesawat sudah ada dan set variable isAirplaneClassExist menjadi true
            isAirplaneClassExist = true
            // kemudian hentikan perulangan
            break
          }
        }
        // menampilkan ke konsol jika kelas pesawat sudah ada atau belum
        console.log('duplicate create airplane class:', isAirplaneClassExist)
        // jika kelas pesawat sudah ada
        if (isAirplaneClassExist) {
          // maka tampilkan pesan error kelas pesawat sudah ada dengan id pesawat tersebut
          return res.status(409).json({
            status: 409,
            message: 'Class Airplane is already exist with this airplaneId',
          })
        }
      }
      // membuat variable untuk membuat id kelas pesawat dengan menggunakan uuidv4
      const id: string = uuidv4()
      // membuat variable untuk membuat tanggal saat ini
      const createdDate: Date = new Date()
      const updatedDate: Date = new Date()
      // panggil fungsi create kelas pesawat dari class service kelas pesawat
      const airplaneClass = await this.airplaneClassService.createAirplaneClass({
        id,
        airplane_class: airplaneClassName,
        airplane_class_price: airplaneClassPrice,
        airplane_id: airplaneId,
        capacity,
        created_date: createdDate,
        updated_date: updatedDate,
      })
      // tampilkan pesan sukses membuat kelas pesawat
      res.status(201).json({
        status: 201,
        message: 'Success create airplane class',
        data: airplaneClass,
      })
      // jika terjadi error
    } catch (error: any) {
      // tampilkan error di konsol
      console.error(error)

      res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
      })
    }
  }

  // membuat fungsi untuk mendapatkan semua data kelas pesawat berdasarkan id pesawat

  public getAirplaneClassByAirplaneId = async (
    req: Request<IReqParams>,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> => {
    try {
      // membuat variable untuk mengambil id pesawat dari params request
      const { id } = req.params
      // panggil fungsi get kelas pesawat berdasarkan id pesawat
      const airplaneClass = await this.airplaneClassService.getAirplaneClassByAirplaneId(id)
      // tampilkan pesan sukses mendapatkan kelas pesawat berdasarkan id pesawat
      res.status(200).json({
        status: 200,
        message: 'Success get airplane class by airplaneId',
        data: airplaneClass,
      })
      // jika terjadi error
    } catch (error: any) {
      // tampilkan error di konsol
      console.error(error)
      // jika error yang terjadi adalah DataError
      if (error instanceof DataError) {
        // maka tampilkan pesan error bad request
        return res.status(400).json({
          status: 400,
          message: 'Bad Request',
        })
      }
      // jika error yang terjadi adalah code 404
      if (error.statusCode === 404) {
        // maka tampilkan pesan error data kelas pesawat dengan id pesawat tersebut tidak ditemukan
        return res.status(404).json({
          status: 404,
          message: 'Data Airplane Class with this airplaneId is not found!',
          data: [],
        })
      }

      res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
      })
    }
  }

  // membuat fungsi untuk update kelas pesawat berdasarkan id kelas pesawat

  public updateAirplaneClassById = async (
    req: Request<IReqParams, any, IReqBody>,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> => {
    try {
      // membuat variable untuk mengambil id kelas pesawat dari params request
      const { id } = req.params
      // membuat variable untuk mengambil data dari body request atau data yang dikirimkan oleh client
      const { airplaneId, airplaneClassName, capacity, airplaneClassPrice } = req.body
      // jika id pesawat tidak ada maka throw error id pesawat diperlukan
      if (airplaneId === undefined) throw new Error('airplaneId is required')
      // mendapatkan semua data kelas pesawat
      const airplaneClasses = await this.airplaneClassService.getAllAirplaneClass()
      // jika data kelas pesawat ada
      if (airplaneClasses.length > 0) {
        // membuat variable untuk mengecek apakah kelas pesawat sudah ada atau belum
        let isAirplaneClassExist: boolean = false
        // melakukan perulangan untuk mengecek apakah kelas pesawat sudah ada atau belum
        for (const airplaneClass of airplaneClasses) {
          // jika nama kelas pesawat sama dengan di database dan id pesawat sama dengan di database dan id kelas pesawat tidak sama dengan id kelas pesawat yang akan diupdate
          if (
            airplaneClassName === airplaneClass.airplaneClassName &&
            airplaneId === airplaneClass.airplaneId &&
            id !== airplaneClass.id
          ) {
            // maka kelas pesawat sudah ada dan set variable isAirplaneClassExist menjadi true
            isAirplaneClassExist = true
            // kemudian hentikan perulangan
            break
          }
        }
        // menampilkan ke konsol jika kelas pesawat sudah ada atau belum
        console.log('duplicate update airplane class:', isAirplaneClassExist)
        // jika kelas pesawat sudah ada
        if (isAirplaneClassExist) {
          // maka tampilkan pesan error kelas pesawat sudah ada dengan id pesawat tersebut
          return res.status(409).json({
            status: 409,
            message: 'Class Airplane is already exist with this airplaneId',
          })
        }
      }
      // membuat variable untuk membuat tanggal saat ini
      const updatedDate: Date = new Date()
      // panggil fungsi update kelas pesawat berdasarkan id kelas pesawat
      const airplaneClass = await this.airplaneClassService.updateAirplaneClassById(id, {
        airplane_class: airplaneClassName,
        airplane_class_price: airplaneClassPrice,
        airplane_id: airplaneId,
        capacity,
        updated_date: updatedDate,
      })
      // tampilkan pesan sukses update kelas pesawat berdasarkan id kelas pesawat
      res.status(200).json({
        status: 200,
        message: 'Success update airplane class by id',
        data: airplaneClass,
      })
      // jika terjadi error
    } catch (error: any) {
      // tampilkan error di konsol
      console.error(error)
      // jika error yang terjadi adalah DataError
      if (error instanceof DataError) {
        // maka tampilkan pesan error bad request
        return res.status(400).json({
          status: 400,
          message: 'Bad Request',
        })
      }
      // jika error yang terjadi adalah code 404
      if (error.statusCode === 404) {
        // maka tampilkan pesan error id kelas pesawat tidak ditemukan
        return res.status(404).json({
          status: 404,
          message: 'ID Airplane Class is not found!',
        })
      }
      // tampilkan pesan error internal server error
      res.status(500).json({
        status: 500,
        message: error.message ?? 'Internal Server Error',
      })
    }
  }

  // membuat fungsi untuk delete kelas pesawat berdasarkan id kelas pesawat

  public deleteAirplaneClassById = async (
    req: Request<IReqParams>,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> => {
    try {
      // membuat variable untuk mengambil id kelas pesawat dari params request
      const { id } = req.params

      /**
       *  pertama hapus data layanan pesawat berdasarkan id kelas pesawat
       *  karena kelas pesawat memiliki relasi dengan layanan pesawat
       * */
      await this.airplaneService.deleteAirplaneServiceByAirplaneClassId(id)
      await this.airplaneClassService.deleteAirplaneClassById(id)
      // tampilkan pesan sukses delete kelas pesawat berdasarkan id kelas pesawat
      res.status(200).json({
        status: 200,
        message: 'Success delete airplane class by id',
      })
      // jika terjadi error
    } catch (error: any) {
      // tampilkan error di konsol
      console.error(error)
      // jika error yang terjadi adalah DataError
      if (error instanceof DataError) {
        // maka tampilkan pesan error bad request
        return res.status(400).json({
          status: 400,
          message: 'Bad Request',
        })
      }
      // jika error yang terjadi adalah code 404
      if (error.statusCode === 404) {
        // maka tampilkan pesan error id kelas pesawat tidak ditemukan
        return res.status(404).json({
          status: 404,
          message: 'ID Airplane Class is not found!',
        })
      }
      // tampilkan pesan error internal server error
      res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
      })
    }
  }
}
