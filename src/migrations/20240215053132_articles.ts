import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('articles', (table: Knex.TableBuilder) => {
    table.uuid('id').defaultTo(knex.fn.uuid()).primary()
    table.string('nama_tempat_wisata', 50).unique()
    table.text('deskripsi')
    table.string('lokasi_wisata', 50)
    table.string('link_gambar', 50)
    table.integer('jumlah_like')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('articles')
}
