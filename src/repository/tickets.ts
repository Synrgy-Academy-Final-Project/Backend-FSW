import { TicketsModel } from '../models/tickets'

export class TicketRepository {
  public findTransactionTickets = async (): Promise<TicketsModel[]> => {
    return await TicketsModel.query()
      .select('created_date as date')
      .count('id as total')
      .groupBy('created_date')
      .orderBy('total', 'desc')
      .throwIfNotFound()
  }
}
