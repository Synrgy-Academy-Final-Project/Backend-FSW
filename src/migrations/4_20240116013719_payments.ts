import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('payments', (table: Knex.CreateTableBuilder) => {
        table.uuid('id').primary().defaultTo(knex.fn.uuid())
        table.string('transaction_time').notNullable()
        table.string('transaction_status').notNullable()
        table.string('transaction_id').notNullable()
        table.string('status_message').notNullable()
        table.string('status_code').notNullable()
        table.string('signature_key').notNullable()
        table.string('payment_type').notNullable()
        table.string('order_id').notNullable()
        table.string('merchant_id').notNullable()
        table.string('gross_amount').notNullable()
        table.string('fraud_status').notNullable()
        table.string('currency').notNullable()
        table.string('settlement_time').notNullable()
        table.string('bank').notNullable()
        table.string('store').notNullable()
        table.string('va_number').notNullable()
        table.timestamp('created_date').notNullable().defaultTo(knex.fn.now())
        table.timestamp('updated_date').notNullable().defaultTo(knex.fn.now())
        table.timestamp('deleted_date')
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('payments')
}
