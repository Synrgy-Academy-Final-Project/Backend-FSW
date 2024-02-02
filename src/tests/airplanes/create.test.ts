import { describe, it, expect } from 'vitest'
import request from 'supertest'
import App from '../../app'
import { login } from '../../utils/login'
import { fakerID_ID as faker } from '@faker-js/faker'

describe('POST /api/v1/airplanes', async () => {
  const app = new App().app
  const { token } = await login(request, app)

  it('should create a new airplane', async () => {
    const response = await request(app)
      .post('/api/v1/airplanes')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        airplaneName: faker.airline.airplane().name,
        airplaneCode: faker.airline.airplane().iataTypeCode,
        airplanePrice: faker.number.int({ min: 100000, max: 1000000 }),
        url: 'https://w7.pngwing.com/pngs/966/510/png-transparent-garuda-indonesia-citilink-airline-logo-business-text-people-indonesia.png',
        companyId: '1879a50f-fca5-4b29-a21b-f3561bd4fda7',
      })

    console.log(response.body)

    expect(response.statusCode).toBe(201)
  })
})
