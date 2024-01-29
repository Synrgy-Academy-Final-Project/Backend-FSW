import { AirplaneFlightTimesModel } from '../models/airplaneFlightTimes'
import type { AirplaneFlightTimes } from '../models/airplaneFlightTimes'

export class AirplaneFlightTimeRepository {
    public save = async (airplaneFlightTime: AirplaneFlightTimes): Promise<AirplaneFlightTimesModel> => {
        return await AirplaneFlightTimesModel.query().insert(airplaneFlightTime).returning('*')
    }

    public findAll = async (): Promise<AirplaneFlightTimesModel[]> => {
        return await AirplaneFlightTimesModel.query()
            .select(
                'aft.id',
                'ap.name as airplaneName',
                'aft.flight_time as flightTime',
                'aft.airplane_flight_time_price as airplaneFlightTimePrice',
                'aft.airplane_id as airplaneId',
                'aft.created_date as createdDate',
                'aft.updated_date as updatedDate'
            )
            .join('airplanes as ap', 'ap.id', 'aft.airplane_id')
            .from('airplane_flight_times as aft')
    }

    public findById = async (id: string): Promise<AirplaneFlightTimesModel[]> => {
        return await AirplaneFlightTimesModel.query()
            .select(
                'aft.id',
                'ap.name as airplaneName',
                'aft.flight_time as flightTime',
                'aft.airplane_flight_time_price as airplaneFlightTimePrice',
                'aft.airplane_id as airplaneId',
                'aft.created_date as createdDate',
                'aft.updated_date as updatedDate'
            )
            .join('airplanes as ap', 'ap.id', 'aft.airplane_id')
            .from('airplane_flight_times as aft')
            .where('aft.id', id)
            .throwIfNotFound()
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
