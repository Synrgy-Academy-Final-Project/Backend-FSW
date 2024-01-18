import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('roles', (table: Knex.CreateTableBuilder) => {
        table.uuid('id').primary().defaultTo(knex.fn.uuid())
        table.string('name').notNullable().defaultTo('ROLE_ADMIN')
        table.timestamp('created_date').notNullable().defaultTo(knex.fn.now())
        table.timestamp('updated_date').notNullable().defaultTo(knex.fn.now())
        table.timestamp('deleted_date')
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('roles')
}
