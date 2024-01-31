/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Request, Response } from 'express'
import { AirplaneService } from '../service/airplanes'
import type { IReqBody, IReqParams } from '../utils/types'
import { v4 as uuidv4 } from 'uuid'
import { DataError, ForeignKeyViolationError } from 'objection'
import { CompanyService } from '../service/companies'

export class AirplaneController {
  readonly airplaneService: AirplaneService
  readonly companyService: CompanyService

  public constructor() {
    this.airplaneService = new AirplaneService()
    this.companyService = new CompanyService()
  }

  public createAirplane = async (
    req: Request<unknown, unknown, IReqBody>,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> => {
    try {
      const { airplaneName, airplaneCode, airplanePrice, url, companyId } = req.body

      const airplanes = await this.airplaneService.getAllAirplane()

      if (airplanes.length > 0) {
        const isAirplaneExist = airplanes.find((airplane) => airplane.airplaneCode === airplaneCode)

        if (isAirplaneExist !== undefined) {
          return res.status(409).json({
            status: 409,
            message: 'Code airplane is already exist',
          })
        }
      }

      const id: string = uuidv4()

      const createdDate: Date = new Date()
      const updatedDate: Date = new Date()

      // update url logo company or airline if url is not undefined
      if (url !== undefined) await this.companyService.updateCompanyById(companyId, { url })

      const airplane = await this.airplaneService.createAirplane({
        id,
        name: airplaneName,
        code: airplaneCode,
        airplane_price: airplanePrice,
        company_id: companyId,
        created_date: createdDate,
        updated_date: updatedDate,
      })

      return res.status(201).json({
        status: 201,
        message: 'Success create airplane',
        data: airplane,
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
          message: 'Company ID Not Found',
        })
      }

      res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
      })
    }
  }

  public getAllAirplane = async (
    _: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> => {
    try {
      const airplanes = await this.airplaneService.getAllAirplane()

      if (airplanes.length === 0) {
        return res.status(404).json({
          status: 404,
          message: 'Airplanes Not Found',
          data: [],
        })
      }

      res.status(200).json({
        status: 200,
        message: 'Success get all airplane',
        data: airplanes,
      })
    } catch (error: any) {
      console.error(error)

      res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
      })
    }
  }

  public getAirplaneById = async (
    req: Request<IReqParams>,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> => {
    try {
      const { id } = req.params

      const airplane = await this.airplaneService.getAirplaneById(id)

      res.status(200).json({
        status: 200,
        message: 'Success get airplane by id',
        data: airplane,
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

  public updateAirplaneById = async (
    req: Request<IReqParams, any, IReqBody>,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> => {
    try {
      const { id } = req.params

      const { airplaneName, airplaneCode, airplanePrice, url, companyId } = req.body

      const updatedDate: Date = new Date()

      let duplicateAirplane: boolean = false

      const airplanes = await this.airplaneService.getAllAirplane()
      const airplaneById = await this.airplaneService.getAirplaneById(id)

      if (airplanes.length > 0) {
        for (const airplane of airplanes) {
          if (airplane.airplaneCode === airplaneCode && airplane.id !== airplaneById[0].id) {
            duplicateAirplane = true
            break
          }
        }
      }

      console.log('duplicate update airplane code:', duplicateAirplane)

      if (duplicateAirplane) {
        return res.status(409).json({
          status: 409,
          message: 'Code airplane is already exist',
        })
      }

      if (url !== undefined && companyId !== undefined) {
        // update url logo company or airline
        await this.companyService.updateCompanyById(airplaneById[0].company_id, { url })
      }

      const airplane = await this.airplaneService.updateAirplaneById(id, {
        name: airplaneName,
        code: airplaneCode,
        airplane_price: airplanePrice,
        updated_date: updatedDate,
      })

      res.status(200).json({
        status: 200,
        message: 'Success update airplane',
        data: airplane,
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
          message: 'ID Airplane Not Found',
        })
      }

      res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
      })
    }
  }

  public deleteAirplaneById = async (
    req: Request<IReqParams>,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> => {
    try {
      const { id } = req.params

      const airplane = await this.airplaneService.deleteAirplaneById(id)

      if (airplane === 0) throw new Error()

      res.status(200).json({
        status: 200,
        message: 'Success delete airplane',
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
          message: 'ID Airplane Not Found',
        })
      }

      if (error instanceof ForeignKeyViolationError) {
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
