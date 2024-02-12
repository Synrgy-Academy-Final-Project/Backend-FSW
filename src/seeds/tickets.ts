import type { Knex } from 'knex'
import { v4 as uuidv4 } from 'uuid'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  // await knex('tickets').del().where('id', 'f05033c7-3efc-4ad1-b4f7-14c3948c3032')

  const id = uuidv4()

  // Inserts seed entries
  await knex('tickets').insert([
    {
      id,
      gate: '10',
      seat: '80T',
      transaction_id: '0202b2eb-b251-49ed-8c0e-e21653d277d7',
      created_date: new Date(),
      updated_date: new Date(),
    },
  ])
}
