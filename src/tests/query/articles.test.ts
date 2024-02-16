import 'dotenv/config'
import { expect, test } from 'vitest'
import knex from 'knex'
import config from '../../config/knexfile'
import { Model, raw } from 'objection'
import { ArticlesModel } from '../../models/articles'

test('get all wisata', async () => {
  // connect db postgres client
  Model.knex(knex(config.development))

  const results = await ArticlesModel.query().throwIfNotFound()

  console.log(results)
  expect(results).toBeTruthy()
}, 15000)

test('get wisata berdasarkan tempat wisata', async () => {
  // connect db postgres client
  Model.knex(knex(config.development))

  const q = 'sulawesi'

  const results = await ArticlesModel.query()
    .whereRaw(`LOWER(nama_tempat_wisata) LIKE LOWER('%${q}%')`)
    .orWhereRaw(`LOWER(lokasi_wisata) LIKE LOWER('%${q}%')`)
    .orWhereRaw(`LOWER(deskripsi) LIKE LOWER('%${q}%')`)
    .orderBy('nama_tempat_wisata', 'DESC')
    .throwIfNotFound()

  console.log(results)
  expect(results).toBeTruthy()
}, 15000)

test('add jumlah like wisata', async () => {
  // connect db postgres client
  Model.knex(knex(config.development))

  const body: number = 100

  const results = await ArticlesModel.query()
    .findById('29cf3efc-461e-4bbf-a0f3-f2cb62612436')

    .patch({
      jumlah_like: raw(`jumlah_like + ${body}`),
    })
    .throwIfNotFound()

  console.log(results)
  expect(results).toBeTruthy()
}, 15000)
