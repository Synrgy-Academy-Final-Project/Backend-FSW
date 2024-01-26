import type { AirplaneClasses, AirplaneClassesModel } from '../models/airplaneClasses'
import { AirplaneClassRepository } from '../repository/airplaneClasses'

export class AirplaneClassService {
    readonly airplaneClassRepository: AirplaneClassRepository

    public constructor() {
        this.airplaneClassRepository = new AirplaneClassRepository()
    }

    public createAirplaneClass = async (airplaneClass: AirplaneClasses): Promise<AirplaneClassesModel> => {
        return await this.airplaneClassRepository.save(airplaneClass)
    }

    public getAllAirplaneClass = async (): Promise<AirplaneClassesModel[]> => {
        return await this.airplaneClassRepository.findAll()
    }

    public getAirplaneClassById = async (id: string): Promise<AirplaneClassesModel[]> => {
        return await this.airplaneClassRepository.findById(id)
    }

    public updateAirplaneClassById = async (
        id: string,
        airplaneClass: Partial<AirplaneClasses>
    ): Promise<AirplaneClassesModel[]> => {
        return await this.airplaneClassRepository.updateById(id, airplaneClass)
    }

    public deleteAirplaneClassById = async (id: string): Promise<number> => {
        return await this.airplaneClassRepository.deleteById(id)
    }
}
