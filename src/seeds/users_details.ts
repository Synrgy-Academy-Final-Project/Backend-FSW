import type { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('users_details').del()

    // Inserts seed entries
    await knex('users_details').insert([
        { address: 'Jl. Lorem', gender: 'Male', phone_number: '+62 812 8829 9917', nik: '8363618117316335' },
        { address: 'Jl. Ipsum', gender: 'Female', phone_number: '+62 896 1092 2802', nik: '7280378151202602' },
    ])
}
