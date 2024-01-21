import 'dotenv/config'
import { UsersModel } from '../../models/users'
import { expect, test } from 'vitest'
import knex from 'knex'
import config from '../../config/knexfile'
import { Model } from 'objection'

test('user', async () => {
    // connect db postgres client
    Model.knex(knex(config.development))

    const result = await UsersModel.query()
        .select(
            'users.id',
            'users.email',
            'users.user_active',
            'roles.name as role_name',
            'users_details.first_name',
            'users_details.last_name'
        )
        .join('roles', 'roles.id', '=', 'users.role_id')
        .join('users_details', 'users_details.id', '=', 'users.user_detail_id')
        .throwIfNotFound()

    console.log(result)

    expect(result).toBeTruthy()
}, 20000)
