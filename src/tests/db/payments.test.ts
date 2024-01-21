import 'dotenv/config'
import { expect, test } from 'vitest'
import knex from 'knex'
import config from '../../config/knexfile'
import { Model, raw } from 'objection'
import { PaymentsModel } from '../../models/payments'

test('transaction', async () => {
    // connect db postgres client
    Model.knex(knex(config.development))

    const results = await PaymentsModel.query()
        .select(raw("TO_CHAR(transaction_time, 'Month') as month"), 'status_code', 'transaction_status')
        .count('transaction_id as transaction_count')
        .sum('gross_amount as transaction_amount')
        .where('transaction_status', 'settlement')
        .groupBy(raw("TO_CHAR(transaction_time, 'Month'), status_code, transaction_status"))
        .throwIfNotFound()

    console.log(results)

    expect(results).toBeTruthy()
}, 20000)
