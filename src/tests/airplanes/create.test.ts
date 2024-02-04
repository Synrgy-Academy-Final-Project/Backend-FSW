import { describe, expect, it } from 'vitest'
import request from 'supertest'
import App from '../../app'
import { login } from '../../utils/login'
import { fakerID_ID as faker } from '@faker-js/faker'

describe('POST /api/v1/airplanes', async () => {
  const app = new App().app
  const { token } = await login(request, app)
  const airplaneName = faker.airline.airplane().name
  const airplaneCode = faker.airline.airplane().iataTypeCode
  const airplanePrice = faker.number.int({ min: 100000, max: 1000000 })

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

    expect(response.statusCode).toBe(201)
  })

  it('should be duplicate code airplane', async () => {
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

    expect(response.statusCode).toBe(409)
  })

  it('should be bad request', async () => {
    const response = await request(app)
      .post('/api/v1/airplanes')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        airplaneName,
        airplanePrice,
        url: 'https://w7.pngwing.com/pngs/966/510/png-transparent-garuda-indonesia-citilink-airline-logo-business-text-people-indonesia.png',
        companyId: '1',
      })

    expect(response.statusCode).toBe(400)
  })

  it('should be internal server error', async () => {
    const response = await request(app)
      .post('/api/v1/airplanes')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        url: 'https://w7.pngwing.com/pngs/966/510/png-transparent-garuda-indonesia-citilink-airline-logo-business-text-people-indonesia.png',
        companyId: '1879a50f-fca5-4b29-a21b-f3561bd4fda7',
      })

    expect(response.statusCode).toBe(500)
  })

  it('should be not found', async () => {
    const response = await request(app)
      .post('/api/v1/airplanes')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        airplaneName,
        airplaneCode: faker.airline.flightNumber(),
        airplanePrice,
        url: 'https://w7.pngwing.com/pngs/966/510/png-transparent-garuda-indonesia-citilink-airline-logo-business-text-people-indonesia.png',
        companyId: '1879a50f-fca5-4b29-a21b-f3561bd4fda1',
      })

    expect(response.statusCode).toBe(404)
  })
}, 15000)
