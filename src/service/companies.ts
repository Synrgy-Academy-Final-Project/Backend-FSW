import type { Companies, CompaniesModel } from '../models/companies'
import { CompanyRepository } from '../repository/companies'

export class CompanyService {
    readonly companyRepository: CompanyRepository

    public constructor() {
        this.companyRepository = new CompanyRepository()
    }

    public getAllCompany = async (): Promise<CompaniesModel[]> => {
        return await this.companyRepository.findAll()
    }

    public getCompanyById = async (id: string): Promise<CompaniesModel> => {
        return await this.companyRepository.findById(id)
    }

    public updateCompanyById = async (id: string, company: Partial<Companies>): Promise<CompaniesModel[]> => {
        return await this.companyRepository.updateById(id, company)
    }
}
