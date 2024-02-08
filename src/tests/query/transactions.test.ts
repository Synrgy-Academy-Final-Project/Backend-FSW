import 'dotenv/config'
import { expect, test } from 'vitest'
import knex from 'knex'
import config from '../../config/knexfile'
import { Model } from 'objection'
import { TransactionsModel } from '../../models/transactions'

test('get the most soldout airplanes', async () => {
  // connect db postgres client
  Model.knex(knex(config.development))

  const results = await TransactionsModel.query()
    .select('ts.airplane_name as airplaneName')
    .count('ts.id as totalSoldout')
    .groupBy('ts.airplane_name')
    .orderBy('totalSoldout', 'desc')
    .whereNull('ts.deleted_date')
    .from('transactions as ts')
    .throwIfNotFound()

  console.log(results)

  expect(results).toBeTruthy()
}, 15000)

test('get the most soldout airlines', async () => {
  // connect db postgres client
  Model.knex(knex(config.development))

  const results = await TransactionsModel.query()
    .select('ts.company_name as airlineName')
    .count('ts.id as totalSoldout')
    .groupBy('ts.company_name')
    .orderBy('totalSoldout', 'desc')
    .whereNotNull('ts.company_name')
    .whereNull('ts.deleted_date')
    .from('transactions as ts')
    .throwIfNotFound()

  console.log(results)

  expect(results).toBeTruthy()
}, 15000)
