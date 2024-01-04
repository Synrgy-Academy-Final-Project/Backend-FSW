import { configDotenv } from 'dotenv'
import type { Knex } from 'knex'
import path from 'path'

// load .env
configDotenv({ path: path.join(process.cwd(), '..', '..', '.env') })

// Update with your config settings.

const config: Record<string, Knex.Config> = {
    development: {
        client: process.env.CLIENT,
        connection: {
            database: process.env.DATABASE,
            user: process.env.USER,
            password: process.env.PASSWORD,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: '../migrations',
        },
        seeds: {
            directory: '../seeds',
        },
    },

    production: {
        client: process.env.CLIENT,
        connection: {
            database: process.env.DATABASE,
            user: process.env.USER,
            password: process.env.PASSWORD,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: '../migrations',
        },
        seeds: {
            directory: '../seeds',
        },
    },
}

export default config
