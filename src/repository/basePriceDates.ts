import { BasePriceDatesModel } from '../models/basePriceDates'
import type { BasePriceDates } from '../models/basePriceDates'

export class BasePriceDatesRepository {
    public save = async (
        uuid: string,
        dateOfDeparture: Date,
        dayCategory: string,
        price: number,
        createdDate: Date,
        updatedDate: Date
    ): Promise<BasePriceDatesModel> => {
        return await BasePriceDatesModel.query()
            .insert({
                id: uuid,
                date_time: dateOfDeparture,
                type: dayCategory,
                date_price: price,
                created_date: createdDate,
                updated_date: updatedDate,
            })
            .throwIfNotFound()
    }

    public findAll = async (): Promise<BasePriceDatesModel[]> => {
        return await BasePriceDatesModel.query().select(
            'id',
            'date_from as dateOfDeparture',
            'type as dayCategory',
            'date_price as price',
            'created_date as createdDate',
            'updated_date as updatedDate'
        )
    }

    public findById = async (id: string): Promise<BasePriceDatesModel> => {
        return await BasePriceDatesModel.query()
            .select('id', 'date_from', 'type', 'date_price', 'created_date', 'updated_date')
            .findById(id)
            .throwIfNotFound()
    }

    public updateById = async (id: string, dates: Partial<BasePriceDates>): Promise<BasePriceDatesModel[]> => {
        return await BasePriceDatesModel.query().patch(dates).where({ id }).throwIfNotFound().returning('*')
    }

    public deleteById = async (id: string): Promise<number> => {
        return await BasePriceDatesModel.query().deleteById(id).throwIfNotFound()
    }
}
