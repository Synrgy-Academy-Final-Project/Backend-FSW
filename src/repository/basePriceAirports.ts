import type { UUID } from 'crypto'
import type { BasePriceAirports } from '../models/basePriceAirports'
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

    public findAll = async (): Promise<BasePriceAirportsModel[]> => {
        return await BasePriceAirportsModel.query()
            .select(
                'bpa.id',
                'apfrom.city as from_city',
                'apfrom.code as from_code',
                'apto.city as to_city',
                'apto.code as to_code',
                'bpa.duration',
                'bpa.airport_price as price'
            )
            .join('airports as apfrom', 'apfrom.id', 'bpa.from_airport_id')
            .join('airports as apto', 'apto.id', 'bpa.to_airport_id')
            .from('baseprice_airports as bpa')
    }

    public updateById = async (id: string, airport: Partial<BasePriceAirports>): Promise<BasePriceAirportsModel[]> => {
        return await BasePriceAirportsModel.query().patch(airport).where({ id }).throwIfNotFound().returning('*')
    }

    public deleteById = async (id: string): Promise<number> => {
        return await BasePriceAirportsModel.query().deleteById(id).throwIfNotFound()
    }
}
