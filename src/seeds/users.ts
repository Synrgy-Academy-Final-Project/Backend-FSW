import type { Knex } from 'knex'
import bcrypt from 'bcrypt'

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    // await knex('users').del().where('id', 'f05033c7-3efc-4ad1-b4f7-14c3948c3030')

    // Inserts seed entries
    await knex('users').insert([
        {
            id: 'f05033c7-3efc-4ad1-b4f7-14c3948c3030',
            email: 'mizz@gmail.com',
            password: await bcrypt.hash('mizz', 10),
            role_id: 'a61526fe-77d6-4363-b40b-b35fca45347f',
            user_detail_id: '9048ecee-962f-4d22-93e4-e3a482cbe773',
            user_active: true,
            created_date: new Date(),
            updated_date: new Date(),
        },
        // {
        //     id: '0c34e170-7c64-4db9-835a-5da2b1e4f7bd',
        //     email: 'lorem@gmail.com',
        //     password: await bcrypt.hash('lorem', 10),
        //     role_id: 'a61526fe-77d6-4363-b40b-b35fca45347f',
        //     user_active: false,
        // },
        // {
        //     id: '9048ecee-962f-4d22-93e4-e3a482cbe770',
        //     email: 'kelompok4@gmail.com',
        //     password: await bcrypt.hash('kelompok4', 10),
        //     role_id: 'a61526fe-77d6-4363-b40b-b35fca45347f',
        //     user_active: true,
        // },
    ])
}
