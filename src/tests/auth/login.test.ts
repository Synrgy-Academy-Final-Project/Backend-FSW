import { describe, it, expect } from 'vitest'
import App from '../../app'
import request from 'supertest'

describe('POST /api/v1/auth/login', () => {
    const app = new App().app

    it('responds with json', async () => {
        const response = await request(app).post('/api/v1/auth/login').send({
            email: 'mizz@gmail.com',
            password: 'mizz',
        })

        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.status).toBe(200)
    }, 20000)
})
