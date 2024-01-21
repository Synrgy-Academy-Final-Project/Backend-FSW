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
}
