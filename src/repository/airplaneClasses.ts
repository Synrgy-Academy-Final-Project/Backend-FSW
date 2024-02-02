import { AirplaneClassesModel } from '../models/airplaneClasses'
import type { AirplaneClasses } from '../models/airplaneClasses'

export class AirplaneClassRepository {
  public save = async (airplaneClass: AirplaneClasses): Promise<AirplaneClassesModel> => {
    return await AirplaneClassesModel.query().insert(airplaneClass).returning('*')
  }

  public findAll = async (): Promise<AirplaneClassesModel[]> => {
    return await AirplaneClassesModel.query()
      .select(
        'apc.id',
        'ap.name as airplaneName',
        'apc.airplane_class as airplaneClassName',
        'apc.capacity',
        'apc.airplane_class_price as airplaneClassPrice',
        'apc.airplane_id as airplaneId',
        'apc.created_date',
        'apc.updated_date'
      )
      .join('airplanes as ap', 'ap.id', 'apc.airplane_id')
      .from('airplane_classes as apc')
  }

  public findByAirplaneId = async (airplaneId: string): Promise<AirplaneClassesModel[]> => {
    return await AirplaneClassesModel.query()
      .select(
        'apc.id',
        'ap.name as airplaneName',
        'apc.airplane_class as airplaneClassName',
        'apc.capacity',
        'apc.airplane_class_price as airplaneClassPrice',
        'apc.airplane_id as airplaneId',
        'apc.created_date',
        'apc.updated_date'
      )
      .join('airplanes as ap', 'ap.id', 'apc.airplane_id')
      .from('airplane_classes as apc')
      .where('apc.airplane_id', airplaneId)
      .throwIfNotFound()
  }

  public updateById = async (id: string, airplaneClass: Partial<AirplaneClasses>): Promise<AirplaneClassesModel[]> => {
    return await AirplaneClassesModel.query().patch(airplaneClass).where({ id }).throwIfNotFound().returning('*')
  }

  public deleteById = async (id: string): Promise<number> => {
    return await AirplaneClassesModel.query().deleteById(id).throwIfNotFound()
  }
}
