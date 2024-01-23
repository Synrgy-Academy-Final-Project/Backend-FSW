/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Request, Response } from 'express'
import { BasePriceAirportService } from '../service/basePriceAirports'
import type { UUID } from 'crypto'
import { AirportService } from '../service/airports'
import { v4 as uuidv4 } from 'uuid'
import type { BasePriceAirports } from '../models/basePriceAirports'

export class BasePriceAirportController {
    readonly basePriceAirportService: BasePriceAirportService
    readonly airportService: AirportService

    public constructor() {
        this.basePriceAirportService = new BasePriceAirportService()
        this.airportService = new AirportService()
    }

    public saveBasePriceAirport = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
        try {
            const { fromAirportId, toAirportId, duration, price } = req.body

            if (fromAirportId === toAirportId) {
                return res.status(400).json({
                    status: 400,
                    message: 'From City and To City must be different',
                })
            }

            const id: string = uuidv4()

            const fromAirport = await this.airportService.getAirportById(fromAirportId as UUID)
            const { code: departureCode } = fromAirport

            const toAirport = await this.airportService.getAirportById(toAirportId as UUID)
            const { code: arrivalCode } = toAirport

            const createdDate = new Date()
            const updatedDate = new Date()

            let duplicateBasePriceAirport: boolean = false

            const basePriceAirports = await this.basePriceAirportService.getAllBasePriceAirport()

            if (basePriceAirports.length > 0) {
                for (const basePriceAirport of basePriceAirports) {
                    if (
                        basePriceAirport.fromAirportId === fromAirportId &&
                        basePriceAirport.toAirportId === toAirportId
                    ) {
                        duplicateBasePriceAirport = true
                        break
                    }
                }
            }

            console.log('duplicate create baseprice airport:', duplicateBasePriceAirport)

            if (duplicateBasePriceAirport) {
                return res.status(409).json({
                    status: 409,
                    message: 'Duplicate From City and To City',
                })
            }

            const basePriceAirport = await this.basePriceAirportService.saveBasePriceAirport(
                id,
                fromAirportId as UUID,
                toAirportId as UUID,
                departureCode,
                arrivalCode,
                duration as number,
                price as number,
                createdDate,
                updatedDate
            )

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
        } catch (error) {
            console.error(error)

            return res.status(500).json({
                status: 500,
                message: 'Internal Server Error',
            })
        }
    }

    public getAllBasePriceAirport = async (_: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
        try {
            const allBasePriceAirport = await this.basePriceAirportService.getAllBasePriceAirport()

            if (allBasePriceAirport === undefined) throw new Error()

            return res.status(200).json({
                status: 200,
                message: 'success',
                data: allBasePriceAirport,
            })
        } catch (error: any) {
            console.error(error)

            if (error.statusCode === 404) {
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

    public getBasePriceAirportById = async (
        req: Request,
        res: Response
    ): Promise<Response<any, Record<string, any>> | undefined> => {
        try {
            const { id } = req.params

            const basePriceAirport = await this.basePriceAirportService.getBasePriceAirportById(id)

            if (basePriceAirport === undefined) throw new Error()

            return res.status(200).json({
                status: 200,
                message: 'success',
                data: basePriceAirport,
            })
        } catch (error: any) {
            console.error(error)

            if (error.statusCode === 404) {
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

    public updateBasePriceAirport = async (
        req: Request,
        res: Response
    ): Promise<Response<any, Record<string, any>> | undefined> => {
        try {
            const { id } = req.params
            const { fromAirportId, toAirportId, duration, price }: Partial<BasePriceAirports> = req.body

            const fromAirport = await this.airportService.getAirportById(fromAirportId as UUID)
            const { code: departureCode } = fromAirport

            const toAirport = await this.airportService.getAirportById(toAirportId as UUID)
            const { code: arrivalCode } = toAirport

            const updatedDate = new Date()

            let duplicateBasePriceAirport: boolean = false

            const basePriceAirports = await this.basePriceAirportService.getAllBasePriceAirport()
            const basePriceAirportById = await this.basePriceAirportService.getBasePriceAirportById(id)

            if (basePriceAirports.length > 0) {
                for (const basePriceAirport of basePriceAirports) {
                    if (
                        basePriceAirport.fromAirportId === fromAirportId &&
                        basePriceAirport.toAirportId === toAirportId &&
                        basePriceAirport.id !== basePriceAirportById.id
                    ) {
                        duplicateBasePriceAirport = true
                        break
                    }
                }
            }

            console.log('duplicate update baseprice airport:', duplicateBasePriceAirport)

            if (duplicateBasePriceAirport) {
                return res.status(409).json({
                    status: 409,
                    message: 'Duplicate From City and To City',
                })
            }

            const basePriceAirport = await this.basePriceAirportService.updateBasePriceAirport(id, {
                from_airport_id: fromAirportId,
                to_airport_id: toAirportId,
                departure_code: departureCode,
                arrival_code: arrivalCode,
                duration,
                airport_price: price,
                updated_date: updatedDate,
            })

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
        } catch (error: any) {
            console.error(error)

            if (error.statusCode === 404) {
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

    public deleteBasePriceAirport = async (
        req: Request,
        res: Response
    ): Promise<Response<any, Record<string, any>>> => {
        try {
            const { id } = req.params

            const basePriceAirport = await this.basePriceAirportService.deleteBasePriceAirport(id)

            if (basePriceAirport === 0) throw new Error()

            return res.status(200).json({
                status: 200,
                message: 'delete airport successfully',
            })
        } catch (error: any) {
            console.error(error)

            if (error.statusCode === 404) {
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
