import type { UUID } from 'crypto'
import { AirportsModel } from '../models/airports'

export class AirportRepository {
    public findAirport = async (): Promise<AirportsModel[]> => {
        return await AirportsModel.query().select('id', 'city', 'code').throwIfNotFound()
    }

    public findAirportById = async (id: UUID): Promise<AirportsModel> => {
        return await AirportsModel.query().findById(id).returning('*').throwIfNotFound()
    }
}
