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

    public saveBasePriceAirport = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { fromAirportId, toAirportId, duration, price } = req.body

            const id: string = uuidv4()

            const fromAirport = await this.airportService.getAirportById(fromAirportId as UUID)
            const { code: departureCode } = fromAirport

            const toAirport = await this.airportService.getAirportById(toAirportId as UUID)
            const { code: arrivalCode } = toAirport

            const createdDate = new Date()
            const updatedDate = new Date()

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
}
