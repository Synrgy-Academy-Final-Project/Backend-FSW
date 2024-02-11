import 'dotenv/config'
import { expect, test } from 'vitest'
import knex from 'knex'
import config from '../../config/knexfile'
import { Model } from 'objection'
import { TicketsModel } from '../../models/tickets'

test('get the most soldout airlines', async () => {
  // connect db postgres client
  Model.knex(knex(config.development))

  const results = await TicketsModel.query()
    .select('created_date as date')
    .count('id as total')
    .groupBy('created_date')
    .orderBy('total', 'desc')
    .throwIfNotFound()

  const ticketsByDate = results.map((result) => ({
    date: result.date,
    total: result.total,
  }))

  console.log(ticketsByDate)

  console.log(results)
  expect(results).toBeTruthy()
}, 15000)
