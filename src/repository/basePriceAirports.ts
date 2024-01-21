import type { UUID } from 'crypto'
import { BasePriceAirportsModel } from '../models/basePriceAirports'

export class BasePriceAirportsRepository {
    public save = async (
        uuid: string,
        fromAirportId: UUID,
        toAirportId: UUID,
        departureCode: string,
        arrivalCode: string,
        duration: number,
        price: number,
        createdDate: Date,
        updatedDate: Date
    ): Promise<BasePriceAirportsModel> => {
        return await BasePriceAirportsModel.query()
            .insert({
                id: uuid,
                from_airport_id: fromAirportId,
                to_airport_id: toAirportId,
                departure_code: departureCode,
                arrival_code: arrivalCode,
                duration,
                airport_price: price,
                created_date: createdDate,
                updated_date: updatedDate,
            })
            .throwIfNotFound()
    }
}
