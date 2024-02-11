import type { TicketsModel } from '../models/tickets'
import { TicketRepository } from '../repository/tickets'

export class TicketService {
  readonly ticketRepository: TicketRepository

  public constructor() {
    this.ticketRepository = new TicketRepository()
  }

  public getTransactionTickets = async (): Promise<TicketsModel[] | unknown> => {
    const results = await this.ticketRepository.findTransactionTickets()

    const ticketsByDate = results.map((result) => ({
      date: result.date,
      total: Number(result.total),
    }))

    return ticketsByDate
  }
}
