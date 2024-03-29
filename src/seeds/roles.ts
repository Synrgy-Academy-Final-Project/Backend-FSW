import type { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    // await knex('roles').del()

    // Inserts seed entries
    await knex('roles').insert([{ name: 'ROLE_ADMIN' }, { name: 'ROLE_USER' }])
}
