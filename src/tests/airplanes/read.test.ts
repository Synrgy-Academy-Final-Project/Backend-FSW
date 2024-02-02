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
      .get('/api/v1/airplanes/03b3b699-0677-4bb4-a004-9e5144e968e7')
      .set({
        Authorization: `Bearer ${token}`,
      })

    expect(response.statusCode).toBe(200)
  })

  it('should be not found', async () => {
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
})
