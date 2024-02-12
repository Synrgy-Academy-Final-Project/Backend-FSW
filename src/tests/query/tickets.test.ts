import 'dotenv/config'
import { expect, test } from 'vitest'
import knex from 'knex'
import config from '../../config/knexfile'
import { Model, raw } from 'objection'
import { TicketsModel } from '../../models/tickets'

test('get the most soldout airlines', async () => {
  // connect db postgres client
  Model.knex(knex(config.development))

  const results = await TicketsModel.query()
    .select(raw("to_char(created_date, 'DD-MM-YYYY') as date"))
    .count('id as total')
    .groupBy(raw("to_char(created_date, 'DD-MM-YYYY')"))
    .orderBy('total', 'desc')
    .throwIfNotFound()

  console.log(results)
  expect(results).toBeTruthy()
}, 15000)
