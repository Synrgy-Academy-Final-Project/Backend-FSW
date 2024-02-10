import 'dotenv/config'
import { expect, test } from 'vitest'
import knex from 'knex'
import config from '../../config/knexfile'
import { Model } from 'objection'
import { TransactionsModel } from '../../models/transactions'

test('get the most soldout airlines', async () => {
  // connect db postgres client
  Model.knex(knex(config.development))

  const results = await TransactionsModel.query()
    .select('ts.company_name as airlineName', 'ts.airplane_name as airplaneName')
    .count('ts.company_name as totalSoldoutAirline')
    .count('ts.airplane_name as totalSoldoutAirplane')
    .groupBy('ts.company_name', 'ts.airplane_name')
    .orderBy('totalSoldoutAirline', 'desc')
    .whereNull('ts.deleted_date')
    .from('transactions as ts')
    .throwIfNotFound()

  console.log(results)

  expect(results).toBeTruthy()
}, 15000)
