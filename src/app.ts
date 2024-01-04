import express from 'express'
import type { Express } from 'express'
import 'dotenv/config'
import knex from 'knex'
import config from './config/knexfile'
import { Model } from 'objection'
import { routeNotFound } from './utils/routeNotFound'
import router from './config/routes'
import cors from 'cors'
import type { Server } from 'http'
import path from 'path'

// connect db postgres client
Model.knex(knex(config.development))

class App {
    public app: Express

    public constructor() {
        this.app = express()
        this.plugins()
        this.routes()
    }

    protected plugins(): void {
        this.app.use(express.json())
        this.app.set('view engine', 'ejs')
        this.app.set('views', path.join(process.cwd(), 'src', 'views'))
        this.app.use(
            cors({
                origin: '*',
            })
        )
    }

    protected routes(): void {
        this.app.use(router)
        this.app.all('*', routeNotFound)
    }

    public startServer(port: number): Server {
        return this.app.listen(port, '0.0.0.0', () => {
            console.log(`⚡️[server]: Server is running at http://127.0.0.1:${port}`)
        })
    }
}

export default App
