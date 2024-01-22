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
            'bpa.id',
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

    const result = await BasePriceAirportsModel.query().findById('3a895256-7cea-41d2-a095-a9bf9671be02')

    const updateById = await BasePriceAirportsModel.query()
        .patch({
            airport_price: 95000,
        })
        .where('id', 'abc9e1d6-220b-447a-82fc-dc880735f1f1')

    const deleteById = await BasePriceAirportsModel.query().deleteById('abc9e1d6-220b-447a-82fc-dc880735f1f1')

    console.log(updateById)
    console.log(deleteById)
    console.log(result)
    console.log(results)

    expect(updateById).toBeFalsy()
    expect(deleteById).toBeFalsy()
    expect(results).toBeTruthy()
}, 20000)
