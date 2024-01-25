/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Request, Response } from 'express'
import { CompanyService } from '../service/companies'
import type { IReqBody, IReqParams } from '../utils/types'
import { DataError } from 'objection'

export class CompanyController {
    readonly companyService: CompanyService

    public constructor() {
        this.companyService = new CompanyService()
    }

    public getAllCompany = async (
        _: Request,
        res: Response
    ): Promise<Response<unknown, Record<string, unknown>> | undefined> => {
        try {
            const companies = await this.companyService.getAllCompany()

            return res.status(200).json({
                status: 200,
                message: 'Success',
                data: companies,
            })
        } catch (error: any) {
            console.log(error)

            if (error.statusCode === 404) {
                return res.status(404).json({
                    status: 404,
                    message: 'Company Not Found',
                    data: [],
                })
            }

            return res.status(500).json({
                status: 500,
                message: 'Internal Server Error',
            })
        }
    }

    public getCompanyById = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
        try {
            const { id } = req.params
            const company = await this.companyService.getCompanyById(id)

            return res.status(200).json({
                status: 200,
                message: 'Success',
                data: company,
            })
        } catch (error: any) {
            console.error(error)

            if (error instanceof DataError) {
                return res.status(400).json({
                    status: 400,
                    message: 'Bad Request',
                })
            }

            if (error.statusCode === 404) {
                return res.status(404).json({
                    status: 404,
                    message: 'ID Company Not Found',
                    data: [],
                })
            }

            return res.status(500).json({
                status: 500,
                message: 'Internal Server Error',
            })
        }
    }

    public updateCompanyById = async (
        req: Request<IReqParams, unknown, IReqBody>,
        res: Response
    ): Promise<Response<any, Record<string, any>>> => {
        try {
            const { id } = req.params
            const { url } = req.body

            const company = await this.companyService.updateCompanyById(id, { url })

            return res.status(200).json({
                status: 200,
                message: 'Success update company',
                data: company,
            })
        } catch (error: any) {
            console.error(error)

            if (error instanceof DataError) {
                return res.status(400).json({
                    status: 400,
                    message: 'Bad Request',
                })
            }

            if (error.statusCode === 404) {
                return res.status(404).json({
                    status: 404,
                    message: 'ID Company Not Found',
                    data: [],
                })
            }

            return res.status(500).json({
                status: 500,
                message: 'Internal Server Error',
            })
        }
    }
}
