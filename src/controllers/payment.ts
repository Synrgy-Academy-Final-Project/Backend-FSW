import { PaymentService } from '../service/payments'
import type { Request, Response } from 'express'

export class PaymentController {
    readonly paymentService: PaymentService

    public constructor() {
        this.paymentService = new PaymentService()
    }

    public getTransactionSuccess = async (
        _: Request,
        res: Response
    ): Promise<Response<unknown, Record<string, unknown>>> => {
        try {
            const transaction = await this.paymentService.getTransactionSuccess()
            return res.status(200).json(transaction)
        } catch (err: unknown) {
            console.error(err)
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    }

    public getTransactionFailed = async (
        _: Request,
        res: Response
    ): Promise<Response<unknown, Record<string, unknown>>> => {
        try {
            const transaction = await this.paymentService.getTransactionFailed()
            return res.status(202).json(transaction)
        } catch (err: unknown) {
            console.error(err)
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    }

    public getTransactionRefund = async (
        _: Request,
        res: Response
    ): Promise<Response<unknown, Record<string, unknown>>> => {
        try {
            const transaction = await this.paymentService.getTransactionRefund()
            return res.status(201).json(transaction)
        } catch (err: unknown) {
            console.error(err)
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    }
}