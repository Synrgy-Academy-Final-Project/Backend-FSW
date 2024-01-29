import { describe, it, expect } from 'vitest'
import request from 'supertest'
import App from '../../app'
import { login } from '../../utils/login'

describe('GET /api/v1/users/profile', async () => {
    const app = new App().app
    const { token } = await login(request, app)

    it('should be get profile user', async () => {
        const response = await request(app)
            .get('/api/v1/users/profile')
            .set({
                Authorization: `Bearer ${token}`,
            })

        expect(response.statusCode).toBe(200)
    })

    it('should be forbidden token', async () => {
        const response = await request(app).get('/api/v1/users/profile')

        expect(response.statusCode).toBe(401)
    })

    it('should be invalid token', async () => {
        const response = await request(app).get('/api/v1/users/profile').set({
            Authorization: `Bearer invalid token`,
        })

        expect(response.statusCode).toBe(403)
    })
})
