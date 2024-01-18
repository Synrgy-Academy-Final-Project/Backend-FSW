import type { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    // await knex('users_details').del().where('id', '9048ecee-962f-4d22-93e4-e3a482cbe773')

    // Inserts seed entries
    await knex('users_details').insert([
        {
            id: '9048ecee-962f-4d22-93e4-e3a482cbe773',
            address: 'Jl. Tegal Raya',
            gender: 'male',
            phone_number: '+62 812 8655 8895',
            first_name: 'Misbah',
            last_name: 'Udin',
            created_date: new Date(),
            updated_date: new Date(),
        },
    ])
}
