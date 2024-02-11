import type { Request, Response } from 'express'
import { TicketService } from '../service/tickets'

export class TicketController {
  readonly ticketService: TicketService

  public constructor() {
    this.ticketService = new TicketService()
  }

  public getTransactionTickets = async (
    _: Request,
    res: Response
  ): Promise<Response<unknown, Record<string, unknown>>> => {
    try {
      const transactionTickets = await this.ticketService.getTransactionTickets()
      return res.status(200).json({
        status: 200,
        message: 'Successfully retrieved transaction tickets',
        data: transactionTickets,
      })
    } catch (err: unknown) {
      console.error(err)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}
