import type { UUID } from 'crypto'
import { BasePriceAirportsRepository } from '../repository/basePriceAirports'
import type { BasePriceAirportsModel } from '../models/basePriceAirports'

export class BasePriceAirportService {
    readonly basePriceAirportRepository: BasePriceAirportsRepository

    public constructor() {
        this.basePriceAirportRepository = new BasePriceAirportsRepository()
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

    public getAllBasePriceAirport = async (): Promise<BasePriceAirportsModel[]> => {
        return await this.basePriceAirportRepository.findAll()
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
