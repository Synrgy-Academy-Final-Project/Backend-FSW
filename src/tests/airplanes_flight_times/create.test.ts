import { describe, expect, it } from 'vitest'
import request from 'supertest'
import App from '../../app'
import { login } from '../../utils/login'
import { fakerID_ID as faker } from '@faker-js/faker'

describe('POST /api/v1/flightimes/airplane', async () => {
  const app = new App().app
  const { token } = await login(request, app)
  const airplaneId = '2bed8291-c32b-46db-b0d3-4ac996a3ba64'
  const flightTime = '00:00:00'
  const airplaneFlightTimePrice = faker.number.int({ min: 100000, max: 1000000 })
  let id = ''

  it('should be create airplane flight time', async () => {
    const response = await request(app)
      .post('/api/v1/flightimes/airplane')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        airplaneId,
        flightTime,
        airplaneFlightTimePrice,
      })

    id = response.body.data.id

    expect(response.statusCode).toBe(201)
  })

  it('should be duplicate flight time', async () => {
    const response = await request(app)
      .post('/api/v1/flightimes/airplane')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        airplaneId,
        flightTime,
        airplaneFlightTimePrice,
      })

    expect(response.statusCode).toBe(409)
  })

  it('should be internal server error', async () => {
    const response = await request(app)
      .post('/api/v1/flightimes/airplane')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        flightTime,
        airplaneFlightTimePrice,
      })
    expect(response.statusCode).toBe(500)
  })

  it('should be deleted airplane', async () => {
    const response = await request(app)
      .delete(`/api/v1/flightimes/airplane/${id}`)
      .set({
        Authorization: `Bearer ${token}`,
      })

    expect(response.statusCode).toBe(200)
  })
}, 15000)
