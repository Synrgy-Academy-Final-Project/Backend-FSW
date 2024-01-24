import type { Companies } from '../models/companies'
import { CompaniesModel } from '../models/companies'

export class CompanyRepository {
    public findAll = async (): Promise<CompaniesModel[]> => {
        return await CompaniesModel.query().throwIfNotFound()
    }

    public findById = async (id: string): Promise<CompaniesModel> => {
        return await CompaniesModel.query().findById(id).throwIfNotFound()
    }

    public updateById = async (id: string, company: Partial<Companies>): Promise<CompaniesModel[]> => {
        return await CompaniesModel.query().patch(company).where({ id }).returning('*').throwIfNotFound()
    }
}
