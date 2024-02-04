import { describe, expect, it } from 'vitest'
import request from 'supertest'
import App from '../../app'
import { v4 as uuidv4 } from 'uuid'
import { login } from '../../utils/login'
import { fakerID_ID as faker } from '@faker-js/faker'

describe('DELETE /api/v1/airplanes/:id', async () => {
  const app = new App().app
  const uuid: string = uuidv4()
  const { token } = await login(request, app)
  const airplaneName = faker.airline.airplane().name
  const airplaneCode = faker.airline.airplane().iataTypeCode
  const airplanePrice = faker.number.int({ min: 100000, max: 1000000 })
  let id: string = ''

  it('should be create airplane', async () => {
    const response = await request(app)
      .post('/api/v1/airplanes')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        airplaneName,
        airplaneCode,
        airplanePrice,
        url: 'https://w7.pngwing.com/pngs/966/510/png-transparent-garuda-indonesia-citilink-airline-logo-business-text-people-indonesia.png',
        companyId: '1879a50f-fca5-4b29-a21b-f3561bd4fda7',
      })

    id = response.body.data.id

    expect(response.statusCode).toBe(201)
  })

  it('should be deleted airplane', async () => {
    const response = await request(app)
      .delete(`/api/v1/airplanes/${id}`)
      .set({
        Authorization: `Bearer ${token}`,
      })

    expect(response.statusCode).toBe(200)
  })

  it('should be bad request', async () => {
    const response = await request(app)
      .delete('/api/v1/airplanes/1')
      .set({
        Authorization: `Bearer ${token}`,
      })

    expect(response.statusCode).toBe(400)
  })

  it('should be not found', async () => {
    const response = await request(app)
      .delete(`/api/v1/airplanes/${uuid}`)
      .set({
        Authorization: `Bearer ${token}`,
      })

    expect(response.statusCode).toBe(404)
  })
}, 15000)
