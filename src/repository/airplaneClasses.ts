import { AirplaneClassesModel } from '../models/airplaneClasses'
import type { AirplaneClasses } from '../models/airplaneClasses'

export class AirplaneClassRepository {
    public save = async (airplaneClass: AirplaneClasses): Promise<AirplaneClassesModel> => {
        return await AirplaneClassesModel.query().insert(airplaneClass).returning('*')
    }

    public findAll = async (): Promise<AirplaneClassesModel[]> => {
        return await AirplaneClassesModel.query().throwIfNotFound()
    }

    public findById = async (id: string): Promise<AirplaneClassesModel> => {
        return await AirplaneClassesModel.query().findById(id).throwIfNotFound()
    }

    public updateById = async (
        id: string,
        airplaneClass: Partial<AirplaneClasses>
    ): Promise<AirplaneClassesModel[]> => {
        return await AirplaneClassesModel.query().patch(airplaneClass).where({ id }).throwIfNotFound().returning('*')
    }

    public deleteById = async (id: string): Promise<number> => {
        return await AirplaneClassesModel.query().deleteById(id).throwIfNotFound()
    }
}
