import { AirplaneFlightTimesModel } from '../models/airplaneFlightTimes'
import type { AirplaneFlightTimes } from '../models/airplaneFlightTimes'

export class AirplaneFlightTimeRepository {
    public save = async (airplaneFlightTime: AirplaneFlightTimes): Promise<AirplaneFlightTimesModel> => {
        return await AirplaneFlightTimesModel.query().insert(airplaneFlightTime).returning('*')
    }

    public findAll = async (): Promise<AirplaneFlightTimesModel[]> => {
        return await AirplaneFlightTimesModel.query().throwIfNotFound()
    }

    public findById = async (id: string): Promise<AirplaneFlightTimesModel> => {
        return await AirplaneFlightTimesModel.query().findById(id).throwIfNotFound()
    }

    public updateById = async (
        id: string,
        airplaneFlightTime: Partial<AirplaneFlightTimes>
    ): Promise<AirplaneFlightTimesModel[]> => {
        return await AirplaneFlightTimesModel.query()
            .patch(airplaneFlightTime)
            .where({ id })
            .throwIfNotFound()
            .returning('*')
    }

    public deleteById = async (id: string): Promise<number> => {
        return await AirplaneFlightTimesModel.query().deleteById(id).throwIfNotFound()
    }
}
