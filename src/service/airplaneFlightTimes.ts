import type { AirplaneFlightTimes, AirplaneFlightTimesModel } from '../models/airplaneFlightTimes'
import { AirplaneFlightTimeRepository } from '../repository/airplaneFlightTimes'

export class AirplaneFlightTimeService {
  readonly airplaneFlightTimeRepository: AirplaneFlightTimeRepository

  public constructor() {
    this.airplaneFlightTimeRepository = new AirplaneFlightTimeRepository()
  }

  public createAirplaneFlightTime = async (
    airplaneFlightTime: AirplaneFlightTimes
  ): Promise<AirplaneFlightTimesModel> => {
    return await this.airplaneFlightTimeRepository.save(airplaneFlightTime)
  }

  public getAllAirplaneFlightTime = async (): Promise<AirplaneFlightTimesModel[]> => {
    return await this.airplaneFlightTimeRepository.findAll()
  }

  public getAirplaneFlightTimeByAirplaneId = async (id: string): Promise<AirplaneFlightTimesModel[]> => {
    return await this.airplaneFlightTimeRepository.findByAirplaneId(id)
  }

  public updateAirplaneFlightTimeById = async (
    id: string,
    airplaneFlightTime: Partial<AirplaneFlightTimes>
  ): Promise<AirplaneFlightTimesModel[]> => {
    return await this.airplaneFlightTimeRepository.updateById(id, airplaneFlightTime)
  }

  public deleteAirplaneFlightTimeById = async (id: string): Promise<number> => {
    return await this.airplaneFlightTimeRepository.deleteById(id)
  }
}
