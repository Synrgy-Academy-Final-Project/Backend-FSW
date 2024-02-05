import { describe, expect, it } from 'vitest'
import request from 'supertest'
import App from '../../app'
import { v4 as uuidv4 } from 'uuid'
import { login } from '../../utils/login'
import { fakerID_ID as faker } from '@faker-js/faker'

describe('DELETE /api/v1/flightimes/airplane/:id', async () => {
  const app = new App().app
  const uuid: string = uuidv4()
  const { token } = await login(request, app)
  const airplaneId = 'f82bde4c-0b9a-4dde-bade-b58a07215b84'
  const flightTime = '15:00:00'
  const airplaneFlightTimePrice = faker.number.int({ min: 100000, max: 1000000 })
  let id: string = ''

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

  it('should be deleted airplane', async () => {
    const response = await request(app)
      .delete(`/api/v1/flightimes/airplane/${id}`)
      .set({
        Authorization: `Bearer ${token}`,
      })

    expect(response.statusCode).toBe(200)
  })

  it('should be bad request', async () => {
    const response = await request(app)
      .delete('/api/v1/flightimes/airplane/1')
      .set({
        Authorization: `Bearer ${token}`,
      })

    expect(response.statusCode).toBe(400)
  })

  it('should be not found', async () => {
    const response = await request(app)
      .delete(`/api/v1/flightimes/airplane/${uuid}`)
      .set({
        Authorization: `Bearer ${token}`,
      })

    expect(response.statusCode).toBe(404)
  })
}, 15000)
