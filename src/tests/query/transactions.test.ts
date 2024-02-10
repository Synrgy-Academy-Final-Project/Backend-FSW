import 'dotenv/config'
import { expect, test } from 'vitest'
import knex from 'knex'
import config from '../../config/knexfile'
import { Model } from 'objection'
import { TransactionsModel } from '../../models/transactions'

test('get the most soldout airlines', async () => {
  // connect db postgres client
  Model.knex(knex(config.development))

  const results = await TransactionsModel.query()
    .select('ts.company_name as airlineName', 'ts.airplane_name as airplaneName')
    .count('ts.company_name as totalSoldoutAirline')
    .count('ts.airplane_name as totalSoldoutAirplane')
    .groupBy('ts.company_name', 'ts.airplane_name')
    .orderBy('totalSoldoutAirline', 'desc')
    .whereNull('ts.deleted_date')
    .from('transactions as ts')
    .throwIfNotFound()

  // const data = []

  // for (const result of results) {
  //   data.push({
  //     airlineName: result.airlineName,
  //     totalSoldout: result.totalSoldoutAirline,
  //     airplanes: [
  //       {
  //         airplaneName: result.airplaneName,
  //         totalSoldout: result.totalSoldoutAirplane,
  //       },
  //     ],
  //   })
  // }

  // console.log(data)

  const airlines = {}

  for (const result of results) {
    // @ts-expect-error object airlines is not added type
    if (airlines[result.airlineName] === undefined) {
      // @ts-expect-error object airlines is not added type
      airlines[result.airlineName] = {
        airlineName: result.airlineName,
        totalSoldout: 0,
        airplanes: [],
      }
    }

    // @ts-expect-error object airlines is not added type
    airlines[result.airlineName].totalSoldout += Number(result.totalSoldoutAirline)
    // @ts-expect-error object airlines is not added type
    airlines[result.airlineName].airplanes.push({
      airplaneName: result.airplaneName,
      totalSoldout: result.totalSoldoutAirplane,
    })
  }

  const finalResults = Object.values(airlines)
  console.log(finalResults)

  expect(results).toBeTruthy()
}, 15000)
