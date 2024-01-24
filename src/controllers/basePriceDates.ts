/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Request, Response } from 'express'
import { BasePriceDateService } from '../service/basePriceDates'
import { v4 as uuidv4 } from 'uuid'
import type { IReqBody, IReqParams } from '../utils/types'

export class BasePriceDatesController {
    readonly basePriceDateService: BasePriceDateService

    public constructor() {
        this.basePriceDateService = new BasePriceDateService()
    }

    public saveBasePriceDate = async (
        req: Request<unknown, unknown, IReqBody>,
        res: Response
    ): Promise<Response<any, Record<string, any>> | undefined> => {
        try {
            let { dateOfDeparture, dayCategory, price } = req.body

            dateOfDeparture = new Date(dateOfDeparture).toISOString()

            const id: string = uuidv4()

            const createdDate: Date = new Date()
            const updatedDate: Date = new Date()

            let duplicateBasePriceDate: boolean = false

            const basePriceDates = await this.basePriceDateService.getAllBasePriceDate()

            basePriceDates.filter((basePriceDate) => {
                // add +7 hour from database date
                return basePriceDate.dateOfDeparture.setHours(7)
            })

            if (basePriceDates.length > 0) {
                for (const basePriceDate of basePriceDates) {
                    if (
                        basePriceDate.dateOfDeparture.toISOString() === dateOfDeparture &&
                        basePriceDate.dayCategory === dayCategory
                    ) {
                        duplicateBasePriceDate = true
                        break
                    }
                }
            }

            console.log('duplicate create baseprice date:', duplicateBasePriceDate)

            if (duplicateBasePriceDate) {
                return res.status(409).json({
                    status: 409,
                    message: 'Duplicate Date and Day Category',
                })
            }

            const result = await this.basePriceDateService.saveBasePriceDate(
                id,
                dateOfDeparture as unknown as Date,
                dayCategory,
                price,
                createdDate,
                updatedDate
            )

            res.status(201).json({
                status: 201,
                message: 'success',
                data: [
                    {
                        id: result.id,
                        dateOfDeparture: result.date_from,
                        dayCategory: result.type,
                        price: result.date_price,
                        createdDate: result.created_date,
                        updatedDate: result.updated_date,
                    },
                ],
            })
        } catch (error: any) {
            console.error(error)

            res.status(500).json({ status: 500, message: 'Internal Server Error' })
        }
    }

    public getAllBasePriceDate = async (
        _: Request,
        res: Response
    ): Promise<Response<any, Record<string, any>> | undefined> => {
        try {
            const results = await this.basePriceDateService.getAllBasePriceDate()

            if (results.length === 0) throw new Error()

            res.status(200).json({
                status: 200,
                message: 'success',
                data: results,
            })
        } catch (error: any) {
            console.error(error)

            if (error.statusCode === 404) {
                return res.status(404).json({
                    status: 404,
                    message: 'Base Price Dates Not Found',
                    data: [],
                })
            }

            res.status(500).json({ status: 500, message: 'Internal Server Error' })
        }
    }

    public getBasePriceDateById = async (
        req: Request<IReqParams>,
        res: Response
    ): Promise<Response<any, Record<string, any>> | undefined> => {
        try {
            const { id } = req.params

            const result = await this.basePriceDateService.getBasePriceDateById(id)

            res.status(200).json({
                status: 200,
                message: 'success',
                data: {
                    id: result.id,
                    dateOfDeparture: result.date_from,
                    dayCategory: result.type,
                    price: result.date_price,
                    createdDate: result.created_date,
                    updatedDate: result.updated_date,
                },
            })
        } catch (error: any) {
            console.error(error)

            if (error.statusCode === 404) {
                return res.status(404).json({
                    status: 404,
                    message: 'ID Base Price Date Not Found',
                })
            }

            res.status(500).json({ status: 500, message: 'Internal Server Error' })
        }
    }

    public updateBasePriceDate = async (
        req: Request<IReqParams, unknown, IReqBody>,
        res: Response
    ): Promise<Response<any, Record<string, any>> | undefined> => {
        try {
            const { id } = req.params

            let { dateOfDeparture, dayCategory, price } = req.body

            dateOfDeparture = new Date(dateOfDeparture).toISOString()

            const updatedDate = new Date()

            let duplicateBasePriceDate: boolean = false

            const basePriceDates = await this.basePriceDateService.getAllBasePriceDate()
            const basePriceDateById = await this.basePriceDateService.getBasePriceDateById(id)

            basePriceDates.filter((basePriceDate) => {
                // add +7 hour from database date
                return basePriceDate.dateOfDeparture.setHours(7)
            })

            if (basePriceDates.length > 0) {
                for (const basePriceDate of basePriceDates) {
                    console.log('db:', basePriceDate.dateOfDeparture.toISOString())
                    console.log('req:', dateOfDeparture)
                    console.log('db:', basePriceDate.dayCategory)
                    console.log('req:', dayCategory)
                    if (
                        basePriceDate.dateOfDeparture.toISOString() === dateOfDeparture &&
                        basePriceDate.dayCategory === dayCategory &&
                        basePriceDate.id !== basePriceDateById.id
                    ) {
                        duplicateBasePriceDate = true
                        break
                    }
                }
            }

            console.log('duplicate update baseprice date:', duplicateBasePriceDate)

            if (duplicateBasePriceDate) {
                return res.status(409).json({
                    status: 409,
                    message: 'Duplicate Date and Day Category',
                })
            }

            const result = await this.basePriceDateService.updateBasePriceDate(id, {
                date_from: dateOfDeparture as unknown as Date,
                type: dayCategory,
                date_price: price,
                updated_date: updatedDate,
            })

            res.status(200).json({
                status: 200,
                message: 'update base price date successfully',
                data: {
                    id: result[0].id,
                    dateOfDeparture: result[0].date_from,
                    dayCategory: result[0].type,
                    price: result[0].date_price,
                    createdDate: result[0].created_date,
                    updatedDate: result[0].updated_date,
                },
            })
        } catch (error: any) {
            console.error(error)

            if (error.statusCode === 404) {
                return res.status(404).json({
                    status: 404,
                    message: 'ID Base Price Date Not Found',
                })
            }

            res.status(500).json({ status: 500, message: 'Internal Server Error' })
        }
    }

    public deleteBasePriceDate = async (
        req: Request<IReqParams>,
        res: Response
    ): Promise<Response<any, Record<string, any>> | undefined> => {
        try {
            const { id } = req.params

            const result = await this.basePriceDateService.deleteBasePriceDate(id)

            if (result === 0) throw new Error()

            res.status(200).json({
                status: 200,
                message: 'delete base price date successfully',
            })
        } catch (error: any) {
            console.error(error)

            if (error.statusCode === 404) {
                return res.status(404).json({
                    status: 404,
                    message: 'ID Base Price Date Not Found',
                })
            }

            res.status(500).json({ status: 500, message: 'Internal Server Error' })
        }
    }
}
