/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Request, Response } from 'express'
import { CompanyService } from '../service/companies'
import type { IReqBody, IReqParams } from '../utils/types'
import { DataError } from 'objection'

export class CompanyController {
  // variable hanya bisa di instance oleh company service dan tidak bisa di ubah value nya
  readonly companyService: CompanyService

  public constructor() {
    // instance company service
    this.companyService = new CompanyService()
  }

  // method untuk mendapatkan semua company

  public getAllCompany = async (
    _: Request,
    res: Response
  ): Promise<Response<unknown, Record<string, unknown>> | undefined> => {
    try {
      // mendapatkan semua company
      const companies = await this.companyService.getAllCompany()

      return res.status(200).json({
        status: 200,
        message: 'Success',
        data: companies,
      })
      // jika terjadi error
    } catch (error: any) {
      // tampilkan error di console
      console.log(error)
      // jika error status 404
      if (error.statusCode === 404) {
        // kirim response 404 bahwa company tidak ditemukan
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

  // method mendapatkan company berdasarkan id

  public getCompanyById = async (
    req: Request<IReqParams>,
    res: Response
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      // get id params
      const { id } = req.params
      // get company by id
      const company = await this.companyService.getCompanyById(id)

      return res.status(200).json({
        status: 200,
        message: 'Success',
        data: company,
      })
      // jika terjadi error
    } catch (error: any) {
      // tampilkan error di console
      console.error(error)
      // jika error dari data error
      if (error instanceof DataError) {
        // kirim response 400 request nya salah
        return res.status(400).json({
          status: 400,
          message: 'Bad Request',
        })
      }
      // jika eror status 404
      if (error.statusCode === 404) {
        // kirim status 404 bahwa id company tidak ditemukan
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

  // method update company

  public updateCompanyById = async (
    req: Request<IReqParams, unknown, IReqBody>,
    res: Response
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      // get id params
      const { id } = req.params
      // get url from req body
      const { url } = req.body
      // update company by id
      const company = await this.companyService.updateCompanyById(id, { url })

      return res.status(200).json({
        status: 200,
        message: 'Success update company',
        data: company,
      })
      // jika terjadi errpr
    } catch (error: any) {
      // tampilkan error di console
      console.error(error)
      // jika error dari data error
      if (error instanceof DataError) {
        // kirim response 400 requestnya buruk
        return res.status(400).json({
          status: 400,
          message: 'Bad Request',
        })
      }
      // jika error status 404
      if (error.statusCode === 404) {
        // kirim response 404 bahwa id company tidak ditemukan
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
