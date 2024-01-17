import type { PaymentsModel } from '../models/payments'
import { PaymentRepository } from '../repository/payments'

export class PaymentService {
    readonly paymentRepository: PaymentRepository

    public constructor() {
        this.paymentRepository = new PaymentRepository()
    }

    public getTransactionSuccess = async (): Promise<PaymentsModel[]> => {
        return await this.paymentRepository.findTransactionSuccess()
    }
}
