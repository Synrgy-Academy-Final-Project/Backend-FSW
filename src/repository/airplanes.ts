import { AirplanesModel } from '../models/airplanes'
import type { Airplanes } from '../models/airplanes'

export class AirplaneRepository {
    public save = async (airplane: Airplanes): Promise<AirplanesModel> => {
        return await AirplanesModel.query().insert(airplane).returning('*')
    }

    public findAll = async (): Promise<AirplanesModel[]> => {
        return await AirplanesModel.query().throwIfNotFound()
    }

    public findById = async (id: string): Promise<AirplanesModel> => {
        return await AirplanesModel.query().findById(id).throwIfNotFound()
    }

    public updateById = async (id: string, airplane: Partial<Airplanes>): Promise<AirplanesModel[]> => {
        return await AirplanesModel.query().patch(airplane).where({ id }).throwIfNotFound().returning('*')
    }

    public deleteById = async (id: string): Promise<number> => {
        return await AirplanesModel.query().deleteById(id).throwIfNotFound()
    }
}
