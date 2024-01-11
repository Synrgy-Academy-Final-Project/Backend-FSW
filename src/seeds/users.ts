import type { Knex } from 'knex'
import bcrypt from 'bcrypt'

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('users').del()

    // Inserts seed entries
    await knex('users').insert([
        {
            email: 'mizz@gmail.com',
            full_name: 'Mizz',
            password: await bcrypt.hash('mizz', 10),
            role_id: '8376fa12-04e2-4943-ba7b-0487f6736d65',
            user_detail_id: 'd24f134f-b884-4e35-8054-661e1281b8c5',
            active: true,
        },
        {
            email: 'lorem@gmail.com',
            full_name: 'Lorem Ipsum',
            password: await bcrypt.hash('lorem', 10),
            role_id: '8376fa12-04e2-4943-ba7b-0487f6736d65',
            user_detail_id: '3a5b928a-8aa5-4605-9891-258e24f823f4',
            active: false,
        },
    ])
}
