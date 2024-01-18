import type { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    // await knex('users_details').del().where('id', '9048ecee-962f-4d22-93e4-e3a482cbe773')

    // Inserts seed entries
    await knex('users_details').insert([
        {
            id: 'd481d809-71a6-465c-b657-e1c7d804964e',
            address: 'Jl. Tegal Raya',
            gender: 'male',
            phone_number: '+62 812 1698 5724',
            first_name: 'Firdaus',
            last_name: 'Dharmawan',
            created_date: new Date(),
            updated_date: new Date(),
        },
    ])
}
