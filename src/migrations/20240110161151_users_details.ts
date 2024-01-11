import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users_details', (table: Knex.CreateTableBuilder) => {
        table.uuid('id').primary().defaultTo(knex.fn.uuid())
        table.string('address')
        table.string('gender')
        table.string('phone_number')
        table.string('visa')
        table.string('passport')
        table.string('resident_permit')
        table.string('nik')
        table.timestamp('created_date').notNullable().defaultTo(knex.fn.now())
        table.timestamp('updated_date').notNullable().defaultTo(knex.fn.now())
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('users_details')
}
