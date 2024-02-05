import { describe, expect, it } from 'vitest'
import request from 'supertest'
import App from '../../app'
import { v4 as uuidv4 } from 'uuid'
import { login } from '../../utils/login'
import { fakerID_ID as faker } from '@faker-js/faker'

describe('PATCH /api/v1/flightimes/airplane/:id', async () => {
  const app = new App().app
  const uuid: string = uuidv4()
  const { token } = await login(request, app)
  const airplaneId = '2bed8291-c32b-46db-b0d3-4ac996a3ba64'
  const flightTime = '15:00:00'
  const airplaneFlightTimePrice = faker.number.int({ min: 100000, max: 1000000 })

  it('should be updated flight time airplane', async () => {
    const response = await request(app)
      .patch('/api/v1/flightimes/airplane/771b56e8-1b2c-4dd0-84be-f387770e26e5')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        airplaneId,
        flightTime,
        airplaneFlightTimePrice,
      })

    expect(response.statusCode).toBe(200)
  })

  it('should be duplicate flight time airplane', async () => {
    const response = await request(app)
      .patch('/api/v1/flightimes/airplane/771b56e8-1b2c-4dd0-84be-f387770e26e5')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        airplaneId,
        flightTime: '21:15:00',
        airplaneFlightTimePrice,
      })

    expect(response.statusCode).toBe(409)
  })

  it('should be bad request', async () => {
    const response = await request(app)
      .patch('/api/v1/flightimes/airplane/1')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        airplaneId,
        airplaneFlightTimePrice,
      })

    expect(response.statusCode).toBe(400)
  })

  it('should be not found', async () => {
    const response = await request(app)
      .patch(`/api/v1/flightimes/airplane/${uuid}`)
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        airplaneId,
        airplaneFlightTimePrice,
      })

    expect(response.statusCode).toBe(404)
  })

  it('should be internal server error', async () => {
    const response = await request(app)
      .patch('/api/v1/flightimes/airplane/771b56e8-1b2c-4dd0-84be-f387770e26e5')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        flightTime,
        airplaneFlightTimePrice,
      })

    expect(response.statusCode).toBe(500)
  })
}, 15000)
