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
            'apfrom.city as from_city',
            'apfrom.code as from_code',
            'apto.city as to_city',
            'apto.code as to_code',
            'bpa.duration',
            'bpa.airport_price as price'
        )
        .join('airports as apfrom', 'apfrom.id', 'bpa.from_airport_id')
        .join('airports as apto', 'apto.id', 'bpa.to_airport_id')
        .from('baseprice_airports as bpa')
        .throwIfNotFound()

    console.log(results)

    expect(results).toBeTruthy()
}, 20000)
