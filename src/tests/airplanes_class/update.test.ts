import { describe, expect, it } from 'vitest'
import request from 'supertest'
import App from '../../app'
import { v4 as uuidv4 } from 'uuid'
import { login } from '../../utils/login'
import { fakerID_ID as faker } from '@faker-js/faker'

describe('PATCH /api/v1/classes/airplane/:id', async () => {
  const app = new App().app
  const uuid: string = uuidv4()
  const { token } = await login(request, app)
  const airplaneId = 'f82bde4c-0b9a-4dde-bade-b58a07215b84'
  const airplaneClassPrice = faker.number.int({ min: 100000, max: 1000000 })

  it('should be updated airplane class', async () => {
    const response = await request(app)
      .patch('/api/v1/classes/airplane/47d81513-2c37-44db-9ae6-e142454d5a93')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        airplaneId,
        airplaneClassName: 'Economy',
        airplaneClassPrice,
      })

    expect(response.statusCode).toBe(200)
  })

  it('should be duplicate class airplane', async () => {
    const response = await request(app)
      .patch('/api/v1/classes/airplane/47d81513-2c37-44db-9ae6-e142454d5a93')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        airplaneId,
        airplaneClassName: 'First Class',
        airplaneClassPrice,
      })

    expect(response.statusCode).toBe(409)
  })

  it('should be bad request', async () => {
    const response = await request(app)
      .patch('/api/v1/classes/airplane/1')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        airplaneId,
        airplaneClassPrice,
      })

    expect(response.statusCode).toBe(400)
  })

  it('should be not found', async () => {
    const response = await request(app)
      .patch(`/api/v1/classes/airplane/${uuid}`)
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        airplaneId,
        airplaneClassPrice,
      })

    expect(response.statusCode).toBe(404)
  })

  it('should be internal server error', async () => {
    const response = await request(app)
      .patch('/api/v1/classes/airplane/47d81513-2c37-44db-9ae6-e142454d5a93')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        airplaneClassName: 'Economy',
        airplaneClassPrice,
      })

    expect(response.statusCode).toBe(500)
  })
}, 15000)
