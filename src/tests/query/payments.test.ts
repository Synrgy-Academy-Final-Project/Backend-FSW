import 'dotenv/config'
import { expect, test } from 'vitest'
import knex from 'knex'
import config from '../../config/knexfile'
import { Model, raw } from 'objection'
import { PaymentsModel } from '../../models/payments'

test('get the most soldout airlines', async () => {
  // connect db postgres client
  Model.knex(knex(config.development))

  const results = await PaymentsModel.query()
    .select(raw("TO_CHAR(transaction_time, 'Month') as month"), 'status_code', 'transaction_status')
    .count('transaction_id as transaction_count')
    .sum('gross_amount as transaction_amount')
    .groupBy(raw("TO_CHAR(transaction_time, 'Month'), status_code, transaction_status"))
    .throwIfNotFound()

  const transactionsByMonth: Record<string, unknown[]> = {}

  for (const result of results) {
    const month = result.month.trim()

    if (transactionsByMonth[month] === undefined) {
      transactionsByMonth[month] = []
    }

    transactionsByMonth[month].push({
      statusCode: result.status_code,
      transactionStatus: result.transaction_status,
      transactionCount: Number(result.transaction_count),
      transactionAmount: Number(result.transaction_amount),
    })
  }

  console.log(transactionsByMonth)

  expect(results).toBeTruthy()
}, 15000)
