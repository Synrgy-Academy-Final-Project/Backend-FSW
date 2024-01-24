/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Request, Response } from 'express'
import { AirplaneService } from '../service/airplanes'
import type { IReqBody, IReqParams } from '../utils/types'
import { v4 as uuidv4 } from 'uuid'
import { DataError } from 'objection'

export class AirplaneController {
    readonly airplaneService: AirplaneService

    public constructor() {
        this.airplaneService = new AirplaneService()
    }

    public createAirplane = async (
        req: Request<unknown, unknown, IReqBody>,
        res: Response
    ): Promise<Response<any, Record<string, any>>> => {
        try {
            const { name, code, airplanePrice, companyId } = req.body

            const airplanes = await this.airplaneService.getAllAirplane()

            const isAirplaneExist = airplanes.find((airplane) => airplane.code === code)

            if (isAirplaneExist !== undefined) {
                return res.status(409).json({
                    status: 409,
                    message: 'Code airplane is already exist',
                })
            }

            const id: string = uuidv4()

            const createdDate: Date = new Date()
            const updatedDate: Date = new Date()

            const airplane = await this.airplaneService.createAirplane({
                id,
                name,
                code,
                airplane_price: airplanePrice,
                company_id: companyId,
                created_date: createdDate,
                updated_date: updatedDate,
                deleted_date: null,
            })

            return res.status(201).json({
                status: 201,
                message: 'Success create airplane',
                data: airplane,
            })
        } catch (error: any) {
            return res.status(500).json({
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

            res.status(200).json({
                status: 200,
                message: 'Success get all airplane',
                data: airplanes,
            })
        } catch (error: any) {
            console.error(error)

            if (error.statusCode === 404) {
                return res.status(404).json({
                    status: 404,
                    message: 'Airplanes Not Found',
                    data: [],
                })
            }

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
        req: Request<IReqParams>,
        res: Response
    ): Promise<Response<any, Record<string, any>> | undefined> => {
        try {
            const { id } = req.params

            const { name, code, airplanePrice, companyId } = req.body

            const updatedDate: Date = new Date()

            const airplane = await this.airplaneService.updateAirplaneById(id, {
                name,
                code,
                airplane_price: airplanePrice,
                company_id: companyId,
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

            res.status(500).json({
                status: 500,
                message: 'Internal Server Error',
            })
        }
    }
}
