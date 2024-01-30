/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Request, Response } from 'express'
import type { IReqBody, IReqParams } from '../utils/types'
import { v4 as uuidv4 } from 'uuid'
import { DataError } from 'objection'
import { AirplaneClassService } from '../service/airplaneClasses'
import { AirplaneService } from '../service/airplanes'

export class AirplaneClassController {
    readonly airplaneClassService: AirplaneClassService
    readonly airplaneService: AirplaneService

    public constructor() {
        this.airplaneClassService = new AirplaneClassService()
        this.airplaneService = new AirplaneService()
    }

    public createAirplaneClass = async (
        req: Request<unknown, unknown, IReqBody>,
        res: Response
    ): Promise<Response<any, Record<string, any>> | undefined> => {
        try {
            const { airplaneId, airplaneClassName, capacity, airplaneClassPrice } = req.body

            const airplaneClasses = await this.airplaneClassService.getAllAirplaneClass()

            if (airplaneClasses.length > 0) {
                let isAirplaneClassExist: boolean = false

                for (const airplaneClass of airplaneClasses) {
                    if (
                        airplaneClassName === airplaneClass.airplaneClassName &&
                        airplaneId === airplaneClass.airplaneId
                    ) {
                        isAirplaneClassExist = true
                        break
                    }
                }

                console.log('duplicate create airplane class:', isAirplaneClassExist)

                if (isAirplaneClassExist) {
                    return res.status(409).json({
                        status: 409,
                        message: 'Class Airplane is already exist with this airplaneId',
                    })
                }
            }

            const id: string = uuidv4()

            const createdDate: Date = new Date()
            const updatedDate: Date = new Date()

            const airplaneClass = await this.airplaneClassService.createAirplaneClass({
                id,
                airplane_class: airplaneClassName,
                airplane_class_price: airplaneClassPrice,
                airplane_id: airplaneId,
                capacity,
                created_date: createdDate,
                updated_date: updatedDate,
            })

            res.status(201).json({
                status: 201,
                message: 'Success create airplane class',
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

    public getAllAirplaneClass = async (
        _: Request,
        res: Response
    ): Promise<Response<any, Record<string, any>> | undefined> => {
        try {
            const airplaneClasses = await this.airplaneClassService.getAllAirplaneClass()

            if (airplaneClasses.length === 0) {
                return res.status(404).json({
                    status: 404,
                    message: 'Airplane Class is not found!',
                    data: [],
                })
            }

            res.status(200).json({
                status: 200,
                message: 'Success get all airplane class',
                data: airplaneClasses,
            })
        } catch (error: any) {
            console.error(error)

            res.status(500).json({
                status: 500,
                message: 'Internal Server Error',
            })
        }
    }

    public getAirplaneClassById = async (
        req: Request,
        res: Response
    ): Promise<Response<any, Record<string, any>> | undefined> => {
        try {
            const { id } = req.params

            const airplaneClass = await this.airplaneClassService.getAirplaneClassById(id)

            res.status(200).json({
                status: 200,
                message: 'Success get airplane class by id',
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
                    message: 'ID Airplane Class is not found!',
                })
            }

            res.status(500).json({
                status: 500,
                message: 'Internal Server Error',
            })
        }
    }

    public updateAirplaneClassById = async (
        req: Request<IReqParams, any, IReqBody>,
        res: Response
    ): Promise<Response<any, Record<string, any>> | undefined> => {
        try {
            const { id } = req.params
            const { airplaneId, airplaneClassName, capacity, airplaneClassPrice } = req.body

            const airplaneClasses = await this.airplaneClassService.getAllAirplaneClass()

            if (airplaneClasses.length > 0) {
                let isAirplaneClassExist: boolean = false

                for (const airplaneClass of airplaneClasses) {
                    if (
                        airplaneClassName === airplaneClass.airplaneClassName &&
                        airplaneId === airplaneClass.airplaneId &&
                        id !== airplaneClass.id
                    ) {
                        isAirplaneClassExist = true
                    } else if (
                        airplaneClassName === airplaneClass.airplaneClassName &&
                        airplaneId === airplaneClass.airplaneId &&
                        id === airplaneClass.id
                    ) {
                        isAirplaneClassExist = false
                    }
                }

                console.log('duplicate update airplane class:', isAirplaneClassExist)

                if (isAirplaneClassExist) {
                    return res.status(409).json({
                        status: 409,
                        message: 'Class Airplane is already exist with this airplaneId',
                    })
                }
            }

            const updatedDate: Date = new Date()

            const airplaneClass = await this.airplaneClassService.updateAirplaneClassById(id, {
                airplane_class: airplaneClassName,
                airplane_class_price: airplaneClassPrice,
                airplane_id: airplaneId,
                capacity,
                updated_date: updatedDate,
            })

            res.status(200).json({
                status: 200,
                message: 'Success update airplane class by id',
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
                    message: 'ID Airplane Class is not found!',
                })
            }

            res.status(500).json({
                status: 500,
                message: 'Internal Server Error',
            })
        }
    }

    public deleteAirplaneClassById = async (
        req: Request<IReqParams>,
        res: Response
    ): Promise<Response<any, Record<string, any>> | undefined> => {
        try {
            const { id } = req.params

            /**
             *  first delete from table airplane_service to be able to delete from table airplane_class
             *  because airplane_class has one relation in table airplane_service
             * */
            await this.airplaneService.deleteAirplaneServiceByAirplaneClassId(id)
            await this.airplaneClassService.deleteAirplaneClassById(id)

            res.status(200).json({
                status: 200,
                message: 'Success delete airplane class by id',
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
                    message: 'ID Airplane Class is not found!',
                })
            }

            res.status(500).json({
                status: 500,
                message: 'Internal Server Error',
            })
        }
    }
}
