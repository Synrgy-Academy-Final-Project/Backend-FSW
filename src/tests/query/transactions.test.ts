import 'dotenv/config'
import { expect, test } from 'vitest'
import knex from 'knex'
import config from '../../config/knexfile'
import { Model } from 'objection'
import { TransactionsModel } from '../../models/transactions'

test('get report transaction of user', async () => {
  // connect db postgres client
  Model.knex(knex(config.development))

  const results = await TransactionsModel.query()
    .select(
      'ts.id',
      'us.email',
      'ud.first_name',
      'ud.last_name',
      'ts.departure_code',
      'ts.arrival_code',
      'ts.created_date',
      'cp.name as maskapai',
      'ts.total_price',
      'pm.transaction_status'
    )
    .join('users as us', 'us.id', 'ts.user_id')
    .join('users_details as ud', 'ud.id', 'us.user_detail_id')
    .join('payments as pm', 'pm.transaction_id', 'ts.id')
    .join('airplanes as ap', 'ap.id', 'ts.airplane_id')
    .join('companies as cp', 'cp.id', 'ap.company_id')
    .whereNotNull('ts.departure_code')
    .whereNotNull('ts.arrival_code')
    .whereNot('pm.transaction_status', ['pending', 'expire'])
    .from('transactions as ts')
    .throwIfNotFound()

  console.log(results)

  expect(results).toBeTruthy()
}, 15000)
