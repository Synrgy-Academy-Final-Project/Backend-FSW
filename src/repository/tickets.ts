import { raw } from 'objection'
import { TicketsModel } from '../models/tickets'

export class TicketRepository {
  public findTransactionTickets = async (): Promise<TicketsModel[]> => {
    return await TicketsModel.query()
      .select(raw("to_char(created_date, 'DD-MM-YYYY') as date"))
      .count('id as total')
      .groupBy(raw("to_char(created_date, 'DD-MM-YYYY')"))
      .orderBy('total', 'desc')
      .throwIfNotFound()
  }
}
