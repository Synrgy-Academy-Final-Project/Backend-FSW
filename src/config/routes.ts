/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { HomeController } from '../controllers/home'
import { UserController } from '../controllers/user'
import { swaggerSpec } from './swagger'
import swaggerUI from 'swagger-ui-express'
import { authToken } from '../middlewares/authToken'
import { PaymentController } from '../controllers/payment'
import { AirportController } from '../controllers/airport'
import { BasePriceAirportController } from '../controllers/basePriceAirport'

const router = express.Router()

const homeController = new HomeController()
const userController = new UserController()
const paymentController = new PaymentController()
const airportController = new AirportController()
const basePriceAirportController = new BasePriceAirportController()

// list route

router.get('/', homeController.index)

/**
 * @openapi
 * /api/v1/auth/login:
 *  post:
 *    summary: Login a user
 *    description: Login for role admin
 *    tags:
 *      - Auth
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                format: email
 *                example: mizz@gmail.com
 *              password:
 *                type: string
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                token:
 *                  type: string
 *      404:
 *        description: Not Found User
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                err:
 *                  type: object
 *                  properties:
 *                      type:
 *                          type: string
 *                          example: NotFound
 *                      name:
 *                          type: string
 *                          example: NotFoundError
 *                      data:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Email or Password is Wrong
 *                      statusCode:
 *                          type: number
 *                          example: 404
 */
router.post('/api/v1/auth/login', userController.login)

/**
 * @openapi
 * /api/v1/users/profile:
 *  get:
 *    summary: Get current user
 *    description: Get profile user
 *    tags:
 *      - Users
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: number
 *                email:
 *                  type: string
 *                  format: email
 *                first_name:
 *                  type: string
 *                last_name:
 *                  type: string
 *                role:
 *                  type: string
 *                active:
 *                  type: boolean
 *                iat:
 *                  type: number
 *                exp:
 *                  type: number
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Invalid token
 *      403:
 *        description: Forbidden
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Forbidden
 */
router.get('/api/v1/users/profile', authToken, userController.profile)

/**
 * @openapi
 * /api/v1/summary/trx/success:
 *  get:
 *    summary: Get transaction success
 *    description: Get summary transaction success
 *    tags:
 *      - Summary
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                  type: object
 *                  properties:
 *                      month:
 *                          type: string
 *                      status_code:
 *                          type: number
 *                      transaction_status:
 *                          type: string
 *                      transaction_count:
 *                          type: string
 *                      transaction_amount:
 *                          type: number
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Internal Server Error
 */
router.get('/api/v1/summary/trx/success', authToken, paymentController.getTransactionSuccess)

/**
 * @openapi
 * /api/v1/summary/trx/failed:
 *  get:
 *    summary: Get transaction failed
 *    description: Get summary transaction failed
 *    tags:
 *      - Summary
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      202:
 *        description: Accepted
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                  type: object
 *                  properties:
 *                      month:
 *                          type: string
 *                      status_code:
 *                          type: number
 *                      transaction_status:
 *                          type: string
 *                      transaction_count:
 *                          type: string
 *                      transaction_amount:
 *                          type: number
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Invalid Token
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Internal Server Error
 */
router.get('/api/v1/summary/trx/failed', authToken, paymentController.getTransactionFailed)

/**
 * @openapi
 * /api/v1/summary/trx/refund:
 *  get:
 *    summary: Get transaction refund
 *    description: Get summary transaction refund
 *    tags:
 *      - Summary
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      201:
 *        description: Created
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                  type: object
 *                  properties:
 *                      month:
 *                          type: string
 *                      status_code:
 *                          type: number
 *                      transaction_status:
 *                          type: string
 *                      transaction_count:
 *                          type: string
 *                      transaction_amount:
 *                          type: number
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Invalid Token
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Internal Server Error
 */
router.get('/api/v1/summary/trx/refund', authToken, paymentController.getTransactionRefund)

/**
 * @openapi
 * /api/v1/airports:
 *  get:
 *    summary: Get All Airport
 *    description: Get List Airport
 *    tags:
 *      - Airports
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                  type: object
 *                  properties:
 *                      month:
 *                          type: string
 *                      status_code:
 *                          type: number
 *                      transaction_status:
 *                          type: string
 *                      transaction_count:
 *                          type: string
 *                      transaction_amount:
 *                          type: number
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Invalid Token
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Internal Server Error
 */
router.get('/api/v1/airports', authToken, airportController.getListAirport)

/**
 * @openapi
 * /api/v1/airports/baseprice:
 *  post:
 *    summary: Create Base Price Airport
 *    description: Create new Base Price Airport
 *    tags:
 *      - Airports
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              fromAirportId:
 *               type: string
 *              toAirportId:
 *               type: string
 *              duration:
 *               type: number
 *              price:
 *               type: number
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                 type: number
 *                message:
 *                 type: string
 *                data:
 *                 type: object
 *                 properties:
 *                  id:
 *                      type: string
 *                  from_airport_id:
 *                      type: string
 *                  to_airport_id:
 *                      type: string
 *                  departure_code:
 *                      type: string
 *                  arrival_code:
 *                      type: string
 *                  duration:
 *                      type: number
 *                  airport_price:
 *                      type: number
 *                  created_date:
 *                      type: date
 *                  updated_date:
 *                      type: date
 *
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Invalid Token
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Internal Server Error
 */
router.post('/api/v1/airports/baseprice', authToken, basePriceAirportController.saveBasePriceAirport)

/**
 * @openapi
 * /api/v1/airports/baseprice:
 *  get:
 *    summary: Get All Base Price Airport
 *    description: Get All Base Price Airport
 *    tags:
 *      - Airports
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                 type: number
 *                message:
 *                 type: string
 *                data:
 *                 type: array
 *                 items:
 *                  type: object
 *                  properties:
 *                      from_city:
 *                          type: string
 *                      from_code:
 *                          type: string
 *                      to_city:
 *                          type: string
 *                      to_code:
 *                          type: string
 *                      duration:
 *                          type: number
 *                      price:
 *                          type: number
 *
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Invalid Token
 *      404:
 *        description: Not Found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: number
 *                  example: 404
 *                message:
 *                  type: string
 *                  example: Base Price Airport Not Found
 *                data:
 *                  type: array
 *                  example: []
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Internal Server Error
 */
router.get('/api/v1/airports/baseprice', authToken, basePriceAirportController.getAllBasePriceAirport)

router.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

export default router
