import { AirportService } from '../service/airports'
import type { Request, Response } from 'express'

export class AirportController {
    readonly airportService: AirportService

    public constructor() {
        this.airportService = new AirportService()
    }

    public getListAirport = async (_: Request, res: Response): Promise<Response<unknown, Record<string, unknown>>> => {
        try {
            const airports = await this.airportService.getListAirport()
            return res.status(200).json(airports)
        } catch (err: unknown) {
            console.error(err)
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    }
}
