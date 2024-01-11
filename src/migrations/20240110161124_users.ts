import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', (table: Knex.CreateTableBuilder) => {
        table.uuid('id').primary().defaultTo(knex.fn.uuid())
        table.string('full_name').notNullable()
        table.string('email').unique()
        table.string('password').notNullable()
        table.uuid('role_id').notNullable().references('id').inTable('roles')
        table.uuid('user_detail_id').notNullable().references('id').inTable('users_details')
        table.string('otp')
        table.boolean('active').notNullable().defaultTo(false)
        table.timestamp('created_date').notNullable().defaultTo(knex.fn.now())
        table.timestamp('updated_date').notNullable().defaultTo(knex.fn.now())
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('users')
}
