// query get all aiport untuk dropdown input bandara, dan ada input harga.

import 'dotenv/config'
import { expect, test } from 'vitest'
import knex from 'knex'
import config from '../../config/knexfile'
import { Model } from 'objection'
import { AirportsModel } from '../../models/airports'

test('list airport', async () => {
    // connect db postgres client
    Model.knex(knex(config.development))

    const results = await AirportsModel.query()
        .select('id', 'city', 'code')
        .where('code', '!=', 'TEST')
        .throwIfNotFound()

    console.log(results)

    expect(results).toBeTruthy()
}, 20000)
