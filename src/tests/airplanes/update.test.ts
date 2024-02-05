import { describe, expect, it } from 'vitest'
import request from 'supertest'
import App from '../../app'
import { v4 as uuidv4 } from 'uuid'
import { login } from '../../utils/login'
import { fakerID_ID as faker } from '@faker-js/faker'

describe('PATCH /api/v1/airplanes/:id', async () => {
  const app = new App().app
  const uuid: string = uuidv4()
  const { token } = await login(request, app)
  const airplanePrice = faker.number.int({ min: 100000, max: 1000000 })

  it('should be updated airplane', async () => {
    const response = await request(app)
      .patch('/api/v1/airplanes/8883f3e2-9d73-4da4-b1bc-fb3ae2b17574')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        airplaneCode: '310',
        airplanePrice,
      })

    expect(response.statusCode).toBe(200)
  })

  it('should be duplicate code airplane', async () => {
    const response = await request(app)
      .patch('/api/v1/airplanes/8883f3e2-9d73-4da4-b1bc-fb3ae2b17574')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        airplaneCode: 'D95',
        airplanePrice,
      })

    expect(response.statusCode).toBe(409)
  })

  it('should be bad request', async () => {
    const response = await request(app)
      .patch('/api/v1/airplanes/1')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        airplanePrice,
      })

    expect(response.statusCode).toBe(400)
  })

  it('should be not found', async () => {
    const response = await request(app)
      .patch(`/api/v1/airplanes/${uuid}`)
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        airplanePrice,
      })

    expect(response.statusCode).toBe(404)
  })
}, 15000)
