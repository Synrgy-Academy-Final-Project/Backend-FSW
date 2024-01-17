import { configDotenv } from 'dotenv'
import type { Knex } from 'knex'
import path from 'path'

// load .env
configDotenv({ path: path.join(process.cwd(), '..', '..', '.env') })

// Update with your config settings.

const config: Record<string, Knex.Config> = {
    development: {
        client: process.env.CLIENT ?? 'pg',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: 5432,
            ssl: {
                rejectUnauthorized: false,
            },
        },
        pool: {
            min: 2,
            max: 20,
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
        client: process.env.CLIENT ?? 'pg',
        connection: process.env.DATABASE_URL,
        pool: {
            min: 2,
            max: 20,
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
