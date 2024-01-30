import { AirplaneServiceModel } from '../models/airplaneService'

export class AirplaneServiceRepository {
    public deleteByAirplaneClassId = async (airplaneClassId: string): Promise<number> => {
        return await AirplaneServiceModel.query().delete().where('airplane_class_id', airplaneClassId)
    }
}
