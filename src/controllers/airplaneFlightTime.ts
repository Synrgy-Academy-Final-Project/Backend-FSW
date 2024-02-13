/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Request, Response } from 'express'
import type { IReqBody, IReqParams } from '../utils/types'
import { v4 as uuidv4 } from 'uuid'
import { DataError } from 'objection'
import { AirplaneFlightTimeService } from '../service/airplaneFlightTimes'

export class AirplaneFlightTimeController {
  // membuat types agar hanya bisa di instance oleh class ini saja
  // dan membuat visibility nya private atau readonly agar tidak bisa diubah valuenya
  readonly airplaneFlightTimeService: AirplaneFlightTimeService
  // membuat instance dari class AirplaneFlightTimeService
  public constructor() {
    this.airplaneFlightTimeService = new AirplaneFlightTimeService()
  }

  // membuat fungsi untuk membuat data waktu penerbangan pesawat

  public createAirplaneFlightTime = async (
    req: Request<unknown, unknown, IReqBody>,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> => {
    try {
      // mengambil data dari body request
      const { airplaneId, flightTime, airplaneFlightTimePrice } = req.body
      // mendapatkan semua data waktu penerbangan pesawat
      const airplaneFlightTimes = await this.airplaneFlightTimeService.getAllAirplaneFlightTime()
      // jika data waktu penerbangan pesawat lebih dari 0
      if (airplaneFlightTimes.length > 0) {
        // membuat variabel untuk mengecek apakah data waktu penerbangan pesawat sudah ada atau belum
        let isAirplaneFlightTimeExist: boolean = false
        // melakukan perulangan untuk mengecek apakah data waktu penerbangan pesawat sudah ada atau belum
        for (const airplaneFlightTime of airplaneFlightTimes) {
          // jika waktu penerbangan yang diinputkan oleh user itu sama dengan waktu penerbangan yang sudah ada di database
          // dan juga jika id pesawat yang diinputkan oleh user itu sama dengan id pesawat yang sudah ada di database
          if (flightTime === airplaneFlightTime.flightTime && airplaneId === airplaneFlightTime.airplaneId) {
            // maka variabel isAirplaneFlightTimeExist akan diubah menjadi true
            isAirplaneFlightTimeExist = true
            // dan perulangan akan dihentikan
            break
          }
        }
        // menampilkan pesan di console
        console.log('duplicate create airplane flight time:', isAirplaneFlightTimeExist)
        // jika data waktu penerbangan pesawat sudah ada
        if (isAirplaneFlightTimeExist) {
          // kirim status 409 dan pesan bahwa waktu penerbangan pesawat sudah ada
          return res.status(409).json({
            status: 409,
            message: 'Flight Time Airplane is already exist with this airplaneId',
          })
        }
      }
      // membuat id dengan menggunakan uuidv4
      const id: string = uuidv4()
      // membuat variabel untuk menyimpan tanggal saat data dibuat
      const createdDate: Date = new Date()
      const updatedDate: Date = new Date()
      // membuat data waktu penerbangan pesawat
      const airplaneClass = await this.airplaneFlightTimeService.createAirplaneFlightTime({
        id,
        flight_time: flightTime as unknown as Date,
        airplane_flight_time_price: airplaneFlightTimePrice,
        airplane_id: airplaneId,
        created_date: createdDate,
        updated_date: updatedDate,
      })
      // kirim status 201 dan data waktu penerbangan pesawat yang sudah dibuat
      res.status(201).json({
        status: 201,
        message: 'Success create airplane flight time',
        data: airplaneClass,
      })
      // jika terjadi error
    } catch (error: any) {
      // menampilkan error di console
      console.error(error)

      res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
      })
    }
  }

  // membuat fungsi untuk mendapatkan semua data waktu penerbangan pesawat berdasarkan id pesawat

  public getAirplaneFlightTimeByAirplaneId = async (
    req: Request<IReqParams>,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> => {
    try {
      // mengambil id pesawat dari params request
      const { id } = req.params
      // mendapatkan data waktu penerbangan pesawat berdasarkan id pesawat
      const airplaneClass = await this.airplaneFlightTimeService.getAirplaneFlightTimeByAirplaneId(id)
      // kirim status 200 dan data waktu penerbangan pesawat yang sudah didapatkan
      res.status(200).json({
        status: 200,
        message: 'Success get airplane flight time by airplaneId',
        data: airplaneClass,
      })
      // jika terjadi error
    } catch (error: any) {
      // menampilkan error di console
      console.error(error)
      // jika error yang terjadi adalah DataError
      if (error instanceof DataError) {
        // kirim status 400 dan pesan bahwa request yang dikirimkan oleh user itu tidak valid
        return res.status(400).json({
          status: 400,
          message: 'Bad Request',
        })
      }
      // jika error yang terjadi adalah code 404
      if (error.statusCode === 404) {
        // kirim status 404 dan pesan bahwa data waktu penerbangan pesawat dengan id pesawat tersebut tidak ditemukan
        return res.status(404).json({
          status: 404,
          message: 'Data Airplane Flight Times with this airplaneId is not found!',
          data: [],
        })
      }
      // kirim status 500 dan pesan bahwa terjadi error di server
      res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
      })
    }
  }

  // membuat fungsi untuk update data waktu penerbangan pesawat berdasarkan id

  public updateAirplaneFlightTimeById = async (
    req: Request<IReqParams, any, IReqBody>,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> => {
    try {
      // mengambil id waktu penerbangan pesawat dari params request
      const { id } = req.params
      // mengambil data dari body request
      const { airplaneId, flightTime, airplaneFlightTimePrice } = req.body
      // jika id pesawat tidak ada maka throw error bahwa id pesawat diperlukan
      if (airplaneId === undefined) throw new Error('airplaneId is required')
      // mendapatkan semua data waktu penerbangan pesawat
      const airplaneFlightTimes = await this.airplaneFlightTimeService.getAllAirplaneFlightTime()
      // jika data waktu penerbangan pesawat lebih dari 0
      if (airplaneFlightTimes.length > 0) {
        // membuat variabel untuk mengecek apakah data waktu penerbangan pesawat sudah ada atau belum
        let isAirplaneFlightTimeExist: boolean = false
        // melakukan perulangan untuk mengecek apakah data waktu penerbangan pesawat sudah ada atau belum
        for (const airplaneFlightTime of airplaneFlightTimes) {
          /**
           * jika waktu penerbangan yang diinputkan oleh user itu sama dengan waktu penerbangan yang sudah ada di database
           * dan juga jika id pesawat yang diinputkan oleh user itu sama dengan id pesawat yang sudah ada di database
           * dan juga jika id waktu penerbangan pesawat yang diinputkan oleh user itu tidak sama dengan id waktu penerbangan pesawat di db yang saat ini mau diupdate
           */
          if (
            flightTime === airplaneFlightTime.flightTime &&
            airplaneId === airplaneFlightTime.airplaneId &&
            id !== airplaneFlightTime.id
          ) {
            // maka variabel isAirplaneFlightTimeExist akan diubah menjadi true
            isAirplaneFlightTimeExist = true
            // dan perulangan akan dihentikan
            break
          }
        }
        // menampilkan pesan di console untuk mengecek apakah data waktu penerbangan pesawat sudah ada atau belum
        console.log('duplicate update airplane flight time:', isAirplaneFlightTimeExist)
        // jika data waktu penerbangan pesawat sudah ada
        if (isAirplaneFlightTimeExist) {
          // kirim status 409 dan pesan bahwa waktu penerbangan pesawat sudah ada
          return res.status(409).json({
            status: 409,
            message: 'Flight Time is already exist with this airplaneId',
          })
        }
      }
      // membuat variabel untuk menyimpan tanggal saat data diupdate
      const updatedDate: Date = new Date()
      // update data waktu penerbangan pesawat berdasarkan id
      const airplaneClass = await this.airplaneFlightTimeService.updateAirplaneFlightTimeById(id, {
        flight_time: flightTime,
        airplane_flight_time_price: airplaneFlightTimePrice,
        airplane_id: airplaneId,
        updated_date: updatedDate,
      })
      // kirim status 200 dan data waktu penerbangan pesawat yang sudah diupdate
      res.status(200).json({
        status: 200,
        message: 'Success update airplane flight time by id',
        data: airplaneClass,
      })
      // jika terjadi error
    } catch (error: any) {
      // menampilkan error di console
      console.error(error)
      // jika error yang terjadi adalah DataError
      if (error instanceof DataError) {
        // kirim status 400 dan pesan bahwa request yang dikirimkan oleh user itu tidak valid
        return res.status(400).json({
          status: 400,
          message: 'Bad Request',
        })
      }
      //  jika error yang terjadi adalah code 404
      if (error.statusCode === 404) {
        // kirim status 404 dan pesan bahwa data waktu penerbangan pesawat dengan id tersebut tidak ditemukan
        return res.status(404).json({
          status: 404,
          message: 'ID Airplane Flight Time is not found!',
        })
      }
      // kirim status 500 dan pesan bahwa terjadi error di server
      res.status(500).json({
        status: 500,
        message: error.message ?? 'Internal Server Error',
      })
    }
  }

  // membuat fungsi untuk hapus data waktu penerbangan pesawat berdasarkan id

  public deleteAirplaneClassById = async (
    req: Request<IReqParams>,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> => {
    try {
      // mengambil id waktu penerbangan pesawat dari params request
      const { id } = req.params
      // hapus data waktu penerbangan pesawat berdasarkan id
      await this.airplaneFlightTimeService.deleteAirplaneFlightTimeById(id)
      // kirim status 200 dan pesan bahwa data waktu penerbangan pesawat sudah dihapus
      res.status(200).json({
        status: 200,
        message: 'Success delete airplane flight time by id',
      })
      // jika terjadi error
    } catch (error: any) {
      // menampilkan error di console
      console.error(error)
      // jika error yang terjadi adalah DataError
      if (error instanceof DataError) {
        // kirim status 400 dan pesan bahwa request yang dikirimkan oleh user itu tidak valid
        return res.status(400).json({
          status: 400,
          message: 'Bad Request',
        })
      }
      // jika error yang terjadi adalah code 404
      if (error.statusCode === 404) {
        // kirim status 404 dan pesan bahwa data waktu penerbangan pesawat dengan id tersebut tidak ditemukan
        return res.status(404).json({
          status: 404,
          message: 'ID Airplane Flight Time is not found!',
        })
      }
      // kirim status 500 dan pesan bahwa terjadi error di server
      res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
      })
    }
  }
}
