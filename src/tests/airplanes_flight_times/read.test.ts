import { describe, it, expect } from 'vitest'
import request from 'supertest'
import App from '../../app'
import { login } from '../../utils/login'
import { v4 as uuidv4 } from 'uuid'

describe('GET /api/v1/airplanes', async () => {
  const app = new App().app
  const uuid: string = uuidv4()
  const { token } = await login(request, app)

  it('should be get data of airplane by airplaneId', async () => {
    const response = await request(app)
      .get('/api/v1/flightimes/airplane/2bed8291-c32b-46db-b0d3-4ac996a3ba64')
      .set({
        Authorization: `Bearer ${token}`,
      })

    expect(response.statusCode).toBe(200)
  })

  it('should be not found by other uuid', async () => {
    const response = await request(app)
      .get(`/api/v1/flightimes/airplane/${uuid}`)
      .set({
        Authorization: `Bearer ${token}`,
      })

    expect(response.statusCode).toBe(404)
  })

  it('should be bad request', async () => {
    const response = await request(app)
      .get('/api/v1/flightimes/airplane/1')
      .set({
        Authorization: `Bearer ${token}`,
      })

    expect(response.statusCode).toBe(400)
  })
}, 15000)
