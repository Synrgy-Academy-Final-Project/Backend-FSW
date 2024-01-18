import type { Knex } from 'knex'
import bcrypt from 'bcrypt'

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    // await knex('users').del().where('id', 'f05033c7-3efc-4ad1-b4f7-14c3948c3032')

    // Inserts seed entries
    await knex('users').insert([
        {
            id: 'f05033c7-3efc-4ad1-b4f7-14c3948c3032',
            email: 'dharmawan@gmail.com',
            password: await bcrypt.hash('dharmawan', 10),
            role_id: 'a61526fe-77d6-4363-b40b-b35fca45347f',
            user_detail_id: 'd481d809-71a6-465c-b657-e1c7d804964e',
            user_active: true,
            created_date: new Date(),
            updated_date: new Date(),
        },
    ])
}
