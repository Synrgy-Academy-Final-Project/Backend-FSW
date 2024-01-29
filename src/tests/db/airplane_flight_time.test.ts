// query get all aiport untuk dropdown input bandara, dan ada input harga.

import 'dotenv/config'
import { expect, test } from 'vitest'
import knex from 'knex'
import config from '../../config/knexfile'
import { Model } from 'objection'
// import { AirplaneFlightTimesModel } from '../../models/airplaneFlightTimes'

test('module flight times', async () => {
    // connect db postgres client
    Model.knex(knex(config.development))

    // const results = await AirplaneFlightTimesModel.query()
    //     .select('id', 'city', 'code')
    //     .where('code', '!=', 'TEST')
    //     .throwIfNotFound()

    // console.log(results)

    // expect(results).toBeTruthy()

    const date = new Date()

    console.log(date)
    const hour = date.getHours().toString().padStart(2, '0')
    const minute = date.getMinutes().toString().padStart(2, '0')
    const second = date.getSeconds().toString().padStart(2, '0')
    const flightTime = `${hour}:${minute}:${second}`
    console.log(flightTime as unknown as Date)

    expect(date).toBeTruthy()
}, 20000)
