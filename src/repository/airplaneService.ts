import { AirplaneServiceModel } from '../models/airplaneService'

export class AirplaneServiceRepository {
    public deleteById = async (id: string): Promise<number> => {
        return await AirplaneServiceModel.query().delete().where('airplane_class_id', id).throwIfNotFound()
    }
}
