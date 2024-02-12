/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Request, Response } from 'express'
import type { IReqBody, IReqParams } from '../utils/types'
import { v4 as uuidv4 } from 'uuid'
import { DataError } from 'objection'
import { AirplaneFlightTimeService } from '../service/airplaneFlightTimes'

export class AirplaneFlightTimeController {
  readonly airplaneFlightTimeService: AirplaneFlightTimeService

  public constructor() {
    this.airplaneFlightTimeService = new AirplaneFlightTimeService()
  }

  public createAirplaneFlightTime = async (
    req: Request<unknown, unknown, IReqBody>,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> => {
    try {
      const { airplaneId, flightTime, airplaneFlightTimePrice } = req.body

      const airplaneFlightTimes = await this.airplaneFlightTimeService.getAllAirplaneFlightTime()

      if (airplaneFlightTimes.length > 0) {
        let isAirplaneFlightTimeExist: boolean = false

        for (const airplaneFlightTime of airplaneFlightTimes) {
          if (flightTime === airplaneFlightTime.flightTime && airplaneId === airplaneFlightTime.airplaneId) {
            isAirplaneFlightTimeExist = true
            break
          }
        }

        console.log('duplicate create airplane flight time:', isAirplaneFlightTimeExist)

        if (isAirplaneFlightTimeExist) {
          return res.status(409).json({
            status: 409,
            message: 'Flight Time Airplane is already exist with this airplaneId',
          })
        }
      }

      const id: string = uuidv4()

      const createdDate: Date = new Date()
      const updatedDate: Date = new Date()

      const airplaneClass = await this.airplaneFlightTimeService.createAirplaneFlightTime({
        id,
        flight_time: flightTime as unknown as Date,
        airplane_flight_time_price: airplaneFlightTimePrice,
        airplane_id: airplaneId,
        created_date: createdDate,
        updated_date: updatedDate,
      })

      res.status(201).json({
        status: 201,
        message: 'Success create airplane flight time',
        data: airplaneClass,
      })
    } catch (error: any) {
      console.error(error)

      res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
      })
    }
  }

  public getAirplaneFlightTimeByAirplaneId = async (
    req: Request<IReqParams>,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> => {
    try {
      const { id } = req.params

      const airplaneClass = await this.airplaneFlightTimeService.getAirplaneFlightTimeByAirplaneId(id)

      res.status(200).json({
        status: 200,
        message: 'Success get airplane flight time by airplaneId',
        data: airplaneClass,
      })
    } catch (error: any) {
      console.error(error)

      if (error instanceof DataError) {
        return res.status(400).json({
          status: 400,
          message: 'Bad Request',
        })
      }

      if (error.statusCode === 404) {
        return res.status(404).json({
          status: 404,
          message: 'Data Airplane Flight Times with this airplaneId is not found!',
          data: [],
        })
      }

      res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
      })
    }
  }

  public updateAirplaneFlightTimeById = async (
    req: Request<IReqParams, any, IReqBody>,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> => {
    try {
      const { id } = req.params
      const { airplaneId, flightTime, airplaneFlightTimePrice } = req.body

      if (airplaneId === undefined) throw new Error('airplaneId is required')

      const airplaneFlightTimes = await this.airplaneFlightTimeService.getAllAirplaneFlightTime()

      if (airplaneFlightTimes.length > 0) {
        let isAirplaneFlightTimeExist: boolean = false

        for (const airplaneFlightTime of airplaneFlightTimes) {
          if (
            flightTime === airplaneFlightTime.flightTime &&
            airplaneId === airplaneFlightTime.airplaneId &&
            id !== airplaneFlightTime.id
          ) {
            isAirplaneFlightTimeExist = true
            break
          }
        }

        console.log('duplicate update airplane flight time:', isAirplaneFlightTimeExist)

        if (isAirplaneFlightTimeExist) {
          return res.status(409).json({
            status: 409,
            message: 'Flight Time is already exist with this airplaneId',
          })
        }
      }

      const updatedDate: Date = new Date()

      const airplaneClass = await this.airplaneFlightTimeService.updateAirplaneFlightTimeById(id, {
        flight_time: flightTime,
        airplane_flight_time_price: airplaneFlightTimePrice,
        airplane_id: airplaneId,
        updated_date: updatedDate,
      })

      res.status(200).json({
        status: 200,
        message: 'Success update airplane flight time by id',
        data: airplaneClass,
      })
    } catch (error: any) {
      console.error(error)

      if (error instanceof DataError) {
        return res.status(400).json({
          status: 400,
          message: 'Bad Request',
        })
      }

      if (error.statusCode === 404) {
        return res.status(404).json({
          status: 404,
          message: 'ID Airplane Flight Time is not found!',
        })
      }

      res.status(500).json({
        status: 500,
        message: error.message ?? 'Internal Server Error',
      })
    }
  }

  public deleteAirplaneClassById = async (
    req: Request<IReqParams>,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> => {
    try {
      const { id } = req.params

      await this.airplaneFlightTimeService.deleteAirplaneFlightTimeById(id)

      res.status(200).json({
        status: 200,
        message: 'Success delete airplane flight time by id',
      })
    } catch (error: any) {
      console.error(error)

      if (error instanceof DataError) {
        return res.status(400).json({
          status: 400,
          message: 'Bad Request',
        })
      }

      if (error.statusCode === 404) {
        return res.status(404).json({
          status: 404,
          message: 'ID Airplane Flight Time is not found!',
        })
      }

      res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
      })
    }
  }
}
