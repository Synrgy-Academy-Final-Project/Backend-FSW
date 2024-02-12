import type { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  // await knex('payments').del().where('id', 'b53fe600-0be5-42d2-bdf7-9d2af4a9faed')
  // await knex('payments').del().where('id', 'b53fe600-0be5-42d2-bdf7-9d2af4a9faee')
  // await knex('payments').del().where('id', 'b53fe600-0be5-42d2-bdf7-9d2af4a9faef')
  // await knex('payments').del().where('id', '44a3ed86-f2cb-4c9e-a009-c006bf92a10b')

  // Inserts seed entries
  await knex('payments').insert([
    {
      id: 'b53fe600-0be5-42d2-bdf7-9d2af4a9faed',
      currency: 'IDR',
      fraud_status: 'accepts',
      merchant_id: 'G723238661',
      payment_type: 'qris',
      signature_key:
        '57231334f89dd65d0fa1297023dae2bebe8db321bf152392dc220428e867f5d93bb63f902e167d1c01e5470089808ee108c06ad923b2ad3a06b85e10b9fb62eb',
      status_message: 'midtrans payment notification',
      transaction_status: 'settlement',
      transaction_time: new Date('2024-03-12T00:00:00.000'),
      transaction_id: '024025f2-789a-458e-a4ff-598456e2df63',
      gross_amount: 450000,
      status_code: 200,
      created_date: new Date('2024-03-12T00:00:00.000'),
      updated_date: new Date('2024-03-12T00:00:00.000'),
    },
    {
      id: 'b53fe600-0be5-42d2-bdf7-9d2af4a9faee',
      currency: 'IDR',
      fraud_status: 'accepts',
      merchant_id: 'G723238661',
      payment_type: 'qris',
      signature_key:
        '57231334f89dd65d0fa1297023dae2bebe8db321bf152392dc220428e867f5d93bb63f902e167d1c01e5470089808ee108c06ad923b2ad3a06b85e10b9fb62eb',
      status_message: 'midtrans payment notification',
      transaction_status: 'failure',
      transaction_time: new Date('2024-03-12T00:00:00.000'),
      transaction_id: '034fd43e-9ade-4b7c-8f00-0cf7c25736e6',
      gross_amount: 450000,
      status_code: 200,
      created_date: new Date('2024-03-12T00:00:00.000'),
      updated_date: new Date('2024-03-12T00:00:00.000'),
    },
    {
      id: 'b53fe600-0be5-42d2-bdf7-9d2af4a9faef',
      currency: 'IDR',
      fraud_status: 'accepts',
      merchant_id: 'G723238661',
      payment_type: 'qris',
      signature_key:
        '57231334f89dd65d0fa1297023dae2bebe8db321bf152392dc220428e867f5d93bb63f902e167d1c01e5470089808ee108c06ad923b2ad3a06b85e10b9fb62eb',
      status_message: 'midtrans payment notification',
      transaction_status: 'refund',
      transaction_time: new Date('2024-03-12T00:00:00.000'),
      transaction_id: '0452f2cf-03be-4d16-9fae-a031d914f03e',
      gross_amount: 450000,
      status_code: 200,
      created_date: new Date('2024-03-12T00:00:00.000'),
      updated_date: new Date('2024-03-12T00:00:00.000'),
    },
    {
      id: '44a3ed86-f2cb-4c9e-a009-c006bf92a10b',
      currency: 'IDR',
      fraud_status: 'accepts',
      merchant_id: 'G723238661',
      payment_type: 'qris',
      signature_key:
        '57231334f89dd65d0fa1297023dae2bebe8db321bf152392dc220428e867f5d93bb63f902e167d1c01e5470089808ee108c06ad923b2ad3a06b85e10b9fb62eb',
      status_message: 'midtrans payment notification',
      transaction_status: 'expire',
      transaction_time: new Date('2024-03-12T00:00:00.000'),
      transaction_id: '052f5f33-0cd4-4fcf-a227-d66104f39d44',
      gross_amount: 450000,
      status_code: 200,
      created_date: new Date('2024-03-12T00:00:00.000'),
      updated_date: new Date('2024-03-12T00:00:00.000'),
    },
  ])
}
