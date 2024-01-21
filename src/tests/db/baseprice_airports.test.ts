import 'dotenv/config'
import { expect, test } from 'vitest'
import knex from 'knex'
import config from '../../config/knexfile'
import { Model } from 'objection'
import { BasePriceAirportsModel } from '../../models/basePriceAirports'

test('base price airport', async () => {
    // connect db postgres client
    Model.knex(knex(config.development))

    const results = await BasePriceAirportsModel.query()
        .select(
            'from_airport_id',
            'to_airport_id',
            'departure_code',
            'arrival_code',
            'duration',
            'airport_price as price'
        )
        .throwIfNotFound()

    console.log(results)

    expect(results).toBeTruthy()
}, 20000)
