/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Request, Response } from 'express'
import { BasePriceAirportService } from '../service/basePriceAirports'
import type { UUID } from 'crypto'
import { AirportService } from '../service/airports'
import { v4 as uuidv4 } from 'uuid'

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

            const id: string = uuidv4()

            const fromAirport = await this.airportService.getAirportById(fromAirportId as UUID)
            const { code: departureCode } = fromAirport

            const toAirport = await this.airportService.getAirportById(toAirportId as UUID)
            const { code: arrivalCode } = toAirport

            const createdDate = new Date()
            const updatedDate = new Date()

            const basePriceAirports = await this.basePriceAirportService.getAllBasePriceAirport()

            if (basePriceAirports.length > 0) {
                const duplicateBasePriceAirport = basePriceAirports.map((basePriceAirport) => {
                    if (basePriceAirport.from_code === departureCode && basePriceAirport.to_code === arrivalCode) {
                        return true
                    }

                    return false
                })

                if (duplicateBasePriceAirport.includes(true)) {
                    return res.status(409).json({
                        status: 409,
                        message: 'Duplicate From City and To City',
                    })
                }
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
                data: basePriceAirport,
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
            const basePriceAirport = await this.basePriceAirportService.getAllBasePriceAirport()

            if (basePriceAirport.length === 0) throw new Error()

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

    public updateBasePriceAirport = async (
        req: Request,
        res: Response
    ): Promise<Response<any, Record<string, any>>> => {
        try {
            const { id } = req.params
            const { fromAirportId, toAirportId, duration, price } = req.body

            const fromAirport = await this.airportService.getAirportById(fromAirportId as UUID)
            const { code: departureCode } = fromAirport

            const toAirport = await this.airportService.getAirportById(toAirportId as UUID)
            const { code: arrivalCode } = toAirport

            const updatedDate = new Date()

            const basePriceAirports = await this.basePriceAirportService.getAllBasePriceAirport()

            if (basePriceAirports.length > 0) {
                const duplicateBasePriceAirport = basePriceAirports.map((basePriceAirport) => {
                    if (basePriceAirport.from_code === departureCode && basePriceAirport.to_code === arrivalCode) {
                        return true
                    }

                    return false
                })

                if (duplicateBasePriceAirport.includes(true)) {
                    return res.status(409).json({
                        status: 409,
                        message: 'Duplicate From City and To City',
                    })
                }
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
