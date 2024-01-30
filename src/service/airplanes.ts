import type { Airplanes, AirplanesModel } from '../models/airplanes'
import { AirplaneServiceRepository } from '../repository/airplaneService'
import { AirplaneRepository } from '../repository/airplanes'

export class AirplaneService {
    readonly airplaneRepository: AirplaneRepository
    readonly airplaneServiceRepository: AirplaneServiceRepository

    public constructor() {
        this.airplaneRepository = new AirplaneRepository()
        this.airplaneServiceRepository = new AirplaneServiceRepository()
    }

    public createAirplane = async (airplane: Airplanes): Promise<AirplanesModel> => {
        return await this.airplaneRepository.save(airplane)
    }

    public getAllAirplane = async (): Promise<AirplanesModel[]> => {
        return await this.airplaneRepository.findAll()
    }

    public getAirplaneById = async (id: string): Promise<AirplanesModel[]> => {
        return await this.airplaneRepository.findById(id)
    }

    public updateAirplaneById = async (id: string, airplane: Partial<AirplanesModel>): Promise<AirplanesModel[]> => {
        return await this.airplaneRepository.updateById(id, airplane)
    }

    public deleteAirplaneById = async (id: string): Promise<number> => {
        return await this.airplaneRepository.deleteById(id)
    }

    public deleteAirplaneServiceByAirplaneClassId = async (airplaneClassId: string): Promise<number> => {
        return await this.airplaneServiceRepository.deleteByAirplaneClassId(airplaneClassId)
    }
}
