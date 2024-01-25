import { AirplanesModel } from '../models/airplanes'
import type { Airplanes } from '../models/airplanes'

export class AirplaneRepository {
    public save = async (airplane: Airplanes): Promise<AirplanesModel> => {
        return await AirplanesModel.query().insert(airplane).returning('*')
    }

    public findAll = async (): Promise<AirplanesModel[]> => {
        return await AirplanesModel.query()
            .select(
                'ap.id',
                'cp.name as airlineName',
                'cp.url',
                'ap.name as airplaneName',
                'ap.code as airplaneCode',
                'ap.airplane_price as airplanePrice',
                'ap.company_id as companyId',
                'ap.created_date',
                'ap.updated_date'
            )
            .join('companies as cp', 'cp.id', 'ap.company_id')
            .from('airplanes as ap')
    }

    public findById = async (id: string): Promise<AirplanesModel[]> => {
        return await AirplanesModel.query()
            .select(
                'ap.id',
                'cp.name as airlineName',
                'cp.url',
                'ap.name as airplaneName',
                'ap.code as airplaneCode',
                'ap.airplane_price as airplanePrice',
                'ap.company_id as companyId',
                'ap.created_date',
                'ap.updated_date'
            )
            .join('companies as cp', 'cp.id', 'ap.company_id')
            .from('airplanes as ap')
            .where('ap.id', id)
            .throwIfNotFound()
    }

    public updateById = async (id: string, airplane: Partial<Airplanes>): Promise<AirplanesModel[]> => {
        const isUpdated = await AirplanesModel.query().patch(airplane).where({ id }).throwIfNotFound()

        if (isUpdated === 1) {
            return await AirplanesModel.query()
                .select(
                    'ap.id',
                    'cp.name as airlineName',
                    'cp.url',
                    'ap.name as airplaneName',
                    'ap.code as airplaneCode',
                    'ap.airplane_price as airplanePrice',
                    'ap.company_id as companyId',
                    'ap.created_date',
                    'ap.updated_date'
                )
                .join('companies as cp', 'cp.id', 'ap.company_id')
                .from('airplanes as ap')
                .where('ap.id', id)
        }

        throw new Error('Update failed')
    }

    public deleteById = async (id: string): Promise<number> => {
        return await AirplanesModel.query().deleteById(id).throwIfNotFound()
    }
}
