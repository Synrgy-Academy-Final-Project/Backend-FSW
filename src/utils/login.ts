import type supertest from 'supertest'
import type { Express } from 'express'

export const login = async (
    st: typeof supertest,
    app: Express
    // @ts-expect-error request
): Promise<request.Response> => {
    const response = await st(app).post('/api/v1/auth/login').send({
        email: 'mizz@gmail.com',
        password: 'mizz',
    })

    return response.body
}
