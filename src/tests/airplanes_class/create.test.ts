import { describe, expect, it } from 'vitest'
import request from 'supertest'
import App from '../../app'
import { login } from '../../utils/login'
import { fakerID_ID as faker } from '@faker-js/faker'

describe('POST /api/v1/classes/airplane', async () => {
  const app = new App().app
  const { token } = await login(request, app)
  const airplaneId = 'f82bde4c-0b9a-4dde-bade-b58a07215b84'
  const airplaneClassName = faker.lorem.words(2)
  const airplaneClassPrice = faker.number.int({ min: 100000, max: 1000000 })
  const capacity = faker.number.int({ min: 100, max: 250 })

  it('should be create airplane class', async () => {
    const response = await request(app)
      .post('/api/v1/classes/airplane')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        airplaneId,
        airplaneClassName,
        airplaneClassPrice,
        capacity,
      })

    expect(response.statusCode).toBe(201)
  })

  it('should be duplicate code airplane', async () => {
    const response = await request(app)
      .post('/api/v1/classes/airplane')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        airplaneId,
        airplaneClassName,
        airplaneClassPrice,
        capacity,
      })

    expect(response.statusCode).toBe(409)
  })

  it('should be internal server error', async () => {
    const response = await request(app)
      .post('/api/v1/classes/airplane')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        capacity,
      })

    expect(response.statusCode).toBe(500)
  })
}, 15000)
