import { describe, it, expect } from 'vitest'
import request from 'supertest'
import App from '../../app'
import { login } from '../../utils/login'
import { v4 as uuidv4 } from 'uuid'

describe('GET /api/v1/airplanes', async () => {
  const app = new App().app
  const uuid: string = uuidv4()
  const { token } = await login(request, app)

  it('should be get all data of airplane', async () => {
    const response = await request(app)
      .get('/api/v1/airplanes')
      .set({
        Authorization: `Bearer ${token}`,
      })

    expect(response.statusCode).toBe(200)
  })

  it('should be get data of airplane by id', async () => {
    const response = await request(app)
      .get('/api/v1/airplanes/1895d620-18b5-4b9b-829e-8aa8b586c4f6')
      .set({
        Authorization: `Bearer ${token}`,
      })

    expect(response.statusCode).toBe(200)
  })

  it('should be not found by id', async () => {
    const response = await request(app)
      .get(`/api/v1/airplanes/${uuid}`)
      .set({
        Authorization: `Bearer ${token}`,
      })

    expect(response.statusCode).toBe(404)
  })

  it('should be bad request', async () => {
    const response = await request(app)
      .get('/api/v1/airplanes/1')
      .set({
        Authorization: `Bearer ${token}`,
      })

    expect(response.statusCode).toBe(400)
  })
}, 15000)
