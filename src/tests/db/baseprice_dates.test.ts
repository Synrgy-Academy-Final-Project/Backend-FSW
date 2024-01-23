import 'dotenv/config'
import { expect, test } from 'vitest'
import knex from 'knex'
import config from '../../config/knexfile'
import { Model } from 'objection'
import { BasePriceDatesModel } from '../../models/basePriceDates'

test('base price airport', async () => {
    // connect db postgres client
    Model.knex(knex(config.development))

    const results = await BasePriceDatesModel.query()
        .select(
            'id',
            'date_from as dateOfDeparture',
            'type as dayCategory',
            'date_price as price',
            'created_date as createdDate',
            'updated_date as updatedDate'
        )
        .throwIfNotFound()

    const findById = await BasePriceDatesModel.query()
        .select(
            'id',
            'type as dayCategory',
            'date_price as price',
            'created_date as createdDate',
            'updated_date as updatedDate'
        )
        .findById('7ca7c0c9-2650-42e1-a7c9-aadee4b821cd')
        .throwIfNotFound()

    const updateById = await BasePriceDatesModel.query()
        .patch({
            date_price: 50000,
        })
        .where('id', '163ef350-af79-46e9-afb5-25f612bd4648')

    const deleteById = await BasePriceDatesModel.query().deleteById('163ef350-af79-46e9-afb5-25f612bd4648')

    console.log(findById)
    console.log(updateById)
    console.log(deleteById)
    console.log(results)

    expect(findById).toBeTruthy()
    expect(updateById).toBeFalsy()
    expect(deleteById).toBeFalsy()
    expect(results).toBeTruthy()
}, 20000)
