import { describe, it, expect } from 'vitest'
import App from '../../app'
import request from 'supertest'

describe('POST /api/v1/auth/login', () => {
  const app = new App().app

  it('should be log in', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({
      email: 'mizz@gmail.com',
      password: 'mizz',
    })

    expect(response.body.token).toEqual(expect.any(String))
    expect(response.status).toBe(200)
  })

  it('should be wrong password', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({
      email: 'mizz@gmail.com',
      password: 'wrong password',
    })

    expect(response.status).toBe(404)
  })

  it('should be forbidden', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({
      email: 'member@gmail.com',
      password: 'member',
    })

    expect(response.status).toBe(403)
  })
}, 15000)
