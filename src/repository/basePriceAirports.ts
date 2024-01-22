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

    public findAll = async (): Promise<BasePriceAirports[]> => {
        return await BasePriceAirportsModel.query()
            .select(
                'bpa.id',
                'apfrom.city as fromCity',
                'apfrom.code as fromCode',
                'apto.city as toCity',
                'apto.code as toCode',
                'bpa.duration',
                'bpa.airport_price as price',
                'bpa.created_date as createdDate',
                'bpa.updated_date as updatedDate'
            )
            .join('airports as apfrom', 'apfrom.id', 'bpa.from_airport_id')
            .join('airports as apto', 'apto.id', 'bpa.to_airport_id')
            .from('baseprice_airports as bpa')
    }

    public findById = async (id: string): Promise<BasePriceAirportsModel> => {
        return await BasePriceAirportsModel.query().findById(id).throwIfNotFound()
    }

    public updateById = async (id: string, airport: Partial<BasePriceAirports>): Promise<BasePriceAirportsModel[]> => {
        return await BasePriceAirportsModel.query().patch(airport).where({ id }).throwIfNotFound().returning('*')
    }

    public deleteById = async (id: string): Promise<number> => {
        return await BasePriceAirportsModel.query().deleteById(id).throwIfNotFound()
    }
}
