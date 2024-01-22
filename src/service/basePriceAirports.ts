import type { UUID } from 'crypto'
import { BasePriceAirportsRepository } from '../repository/basePriceAirports'
import type { BasePriceAirportsModel } from '../models/basePriceAirports'
import type { BasePriceAirportsType } from '../utils/types'
import { AirportRepository } from '../repository/airports'

export class BasePriceAirportService {
    readonly basePriceAirportRepository: BasePriceAirportsRepository
    readonly airportRepository: AirportRepository

    public constructor() {
        this.basePriceAirportRepository = new BasePriceAirportsRepository()
        this.airportRepository = new AirportRepository()
    }

    public saveBasePriceAirport = async (
        id: string,
        fromAirportId: UUID,
        toAirportId: UUID,
        departureCode: string,
        arrivalCode: string,
        duration: number,
        price: number,
        createdDate: Date,
        updatedDate: Date
    ): Promise<BasePriceAirportsModel> => {
        return await this.basePriceAirportRepository.save(
            id,
            fromAirportId,
            toAirportId,
            departureCode,
            arrivalCode,
            duration,
            price,
            createdDate,
            updatedDate
        )
    }

    public getAllBasePriceAirport = async (): Promise<BasePriceAirportsType[]> => {
        const results = await this.basePriceAirportRepository.findAll()

        const result = results.map((result) => {
            return {
                id: result.id,
                fromCity: result.fromCity,
                fromCode: result.fromCode,
                toCity: result.toCity,
                toCode: result.toCode,
                duration: result.duration,
                price: result.price,
                fromAirportId: result.fromAirportId,
                toAirportId: result.toAirportId,
                createdDate: result.createdDate,
                updatedDate: result.updatedDate,
            }
        })

        return result
    }

    public getBasePriceAirportById = async (id: string): Promise<BasePriceAirportsType> => {
        const basePriceAirport = await this.basePriceAirportRepository.findById(id)

        const fromAirport = await this.airportRepository.findAirportById(basePriceAirport.from_airport_id)
        const toAirport = await this.airportRepository.findAirportById(basePriceAirport.to_airport_id)

        return {
            id: basePriceAirport.id,
            fromCity: fromAirport.city,
            fromCode: fromAirport.code,
            toCity: toAirport.city,
            toCode: toAirport.code,
            duration: basePriceAirport.duration,
            price: basePriceAirport.airport_price,
            fromAirportId: basePriceAirport.from_airport_id,
            toAirportId: basePriceAirport.to_airport_id,
            createdDate: basePriceAirport.created_date,
            updatedDate: basePriceAirport.updated_date,
        }
    }

    public updateBasePriceAirport = async (
        id: string,
        airport: Partial<BasePriceAirportsModel>
    ): Promise<BasePriceAirportsModel[]> => {
        return await this.basePriceAirportRepository.updateById(id, airport)
    }

    public deleteBasePriceAirport = async (id: string): Promise<number> => {
        return await this.basePriceAirportRepository.deleteById(id)
    }
}
