import type { AirportsModel } from '../models/airports'
import { AirportRepository } from '../repository/airports'

export class AirportService {
  readonly airportRepository: AirportRepository

  public constructor() {
    this.airportRepository = new AirportRepository()
  }

  public getListAirport = async (): Promise<AirportsModel[]> => {
    return await this.airportRepository.findAirport()
  }

  public getAirportById = async (id: string): Promise<AirportsModel> => {
    return await this.airportRepository.findAirportById(id)
  }
}
