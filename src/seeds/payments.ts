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
      currency: 'IDR',
      fraud_status: 'accepts',
      merchant_id: 'G723238661',
      payment_type: 'qris',
      signature_key:
        '57231334f89dd65d0fa1297023dae2bebe8db321bf152392dc220428e867f5d93bb63f902e167d1c01e5470089808ee108c06ad923b2ad3a06b85e10b9fb62eb',
      status_message: 'midtrans payment notification',
      transaction_status: 'settlement',
      transaction_time: new Date(),
      transaction_id: '2c9d7022-b36a-4114-ae1c-e00fa5ece0af',
      gross_amount: 450000,
      status_code: 200,
      created_date: new Date(),
      updated_date: new Date(),
    },
  ])
}
