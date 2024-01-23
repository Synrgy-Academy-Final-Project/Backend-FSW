import type { BasePriceDatesModel } from '../models/basePriceDates'
import { BasePriceDatesRepository } from '../repository/basePriceDates'

export class BasePriceDateService {
    readonly basePriceDateRepository: BasePriceDatesRepository

    public constructor() {
        this.basePriceDateRepository = new BasePriceDatesRepository()
    }

    public saveBasePriceDate = async (
        id: string,
        dateOfDeparture: Date,
        dayCategory: string,
        price: number,
        createdDate: Date,
        updatedDate: Date
    ): Promise<BasePriceDatesModel> => {
        return await this.basePriceDateRepository.save(
            id,
            dateOfDeparture,
            dayCategory,
            price,
            createdDate,
            updatedDate
        )
    }

    public getAllBasePriceDate = async (): Promise<BasePriceDatesModel[]> => {
        return await this.basePriceDateRepository.findAll()
    }

    public getBasePriceById = async (id: string): Promise<BasePriceDatesModel> => {
        return await this.basePriceDateRepository.findById(id)
    }

    public updateBasePriceDate = async (
        id: string,
        dates: Partial<BasePriceDatesModel>
    ): Promise<BasePriceDatesModel[]> => {
        return await this.basePriceDateRepository.updateById(id, dates)
    }

    public deleteBasePriceDate = async (id: string): Promise<number> => {
        return await this.basePriceDateRepository.deleteById(id)
    }
}
