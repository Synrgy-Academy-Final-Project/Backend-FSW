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
import { BasePriceDatesController } from '../controllers/basePriceDates'
import { CompanyController } from '../controllers/company'
import { AirplaneController } from '../controllers/airplane'

const router = express.Router()

const homeController = new HomeController()
const userController = new UserController()
const paymentController = new PaymentController()
const airportController = new AirportController()
const basePriceAirportController = new BasePriceAirportController()
const basePriceDateController = new BasePriceDatesController()
const companyController = new CompanyController()
const airplaneController = new AirplaneController()

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
 *                      id:
 *                          type: string
 *                      city:
 *                          type: string
 *                      code:
 *                          type: string
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
 *      201:
 *        description: Created
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
 *                  fromAirportId:
 *                      type: string
 *                  toAirportId:
 *                      type: string
 *                  departureCode:
 *                      type: string
 *                  arrivalCode:
 *                      type: string
 *                  duration:
 *                      type: number
 *                  price:
 *                      type: number
 *                  createdDate:
 *                      type: date
 *                  updatedDate:
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
 *      409:
 *        description: Conflict
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: number
 *                  example: 409
 *                message:
 *                  type: string
 *                  example: Duplicate From City and To City
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
 *                      id:
 *                          type: string
 *                      fromCity:
 *                          type: string
 *                      fromCode:
 *                          type: string
 *                      toCity:
 *                          type: string
 *                      toCode:
 *                          type: string
 *                      duration:
 *                          type: number
 *                      price:
 *                          type: number
 *                      fromAirportId:
 *                          type: string
 *                      toAirportId:
 *                          type: string
 *                      createdDate:
 *                          type: date
 *                      updatedDate:
 *                          type: date
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

/**
 * @openapi
 * /api/v1/airports/baseprice/{id}:
 *  patch:
 *    summary: Update Base Price Airport By Id
 *    description: Update Base Price Airport By Id
 *    tags:
 *      - Airports
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          format: uuid
 *        description: UUID of base price airport
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
 *                  fromAirportId:
 *                      type: string
 *                  toAirportId:
 *                      type: string
 *                  departureCode:
 *                      type: string
 *                  arrivalCode:
 *                      type: string
 *                  duration:
 *                      type: number
 *                  price:
 *                      type: number
 *                  createdDate:
 *                      type: date
 *                  updatedDate:
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
 *      409:
 *        description: Conflict
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: number
 *                  example: 409
 *                message:
 *                  type: string
 *                  example: Duplicate From City and To City
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
router.patch('/api/v1/airports/baseprice/:id', authToken, basePriceAirportController.updateBasePriceAirport)

/**
 * @openapi
 * /api/v1/airports/baseprice/{id}:
 *  get:
 *    summary: Get Base Price Airport By Id
 *    description: Get Base Price Airport By Id
 *    tags:
 *      - Airports
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          format: uuid
 *        description: UUID of base price airport
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
 *                      id:
 *                          type: string
 *                      fromCity:
 *                          type: string
 *                      fromCode:
 *                          type: string
 *                      toCity:
 *                          type: string
 *                      toCode:
 *                          type: string
 *                      duration:
 *                          type: number
 *                      price:
 *                          type: number
 *                      fromAirportId:
 *                          type: string
 *                      toAirportId:
 *                          type: string
 *                      createdDate:
 *                          type: date
 *                      updatedDate:
 *                          type: date
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
router.get('/api/v1/airports/baseprice/:id', authToken, basePriceAirportController.getBasePriceAirportById)

/**
 * @openapi
 * /api/v1/airports/baseprice/{id}:
 *  delete:
 *    summary: Delete Base Price Airport By Id
 *    description: Delete Base Price Airport By Id
 *    tags:
 *      - Airports
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          format: uuid
 *        description: UUID of base price airport
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
 *      404:
 *        description: Not Found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: ID Base Price Airport Not Found
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
router.delete('/api/v1/airports/baseprice/:id', authToken, basePriceAirportController.deleteBasePriceAirport)

/**
 * @openapi
 * /api/v1/dates/baseprice:
 *  post:
 *    summary: Create Base Price Date
 *    description: Create new Base Price Date
 *    tags:
 *      - Dates
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              dateOfDeparture:
 *               type: date
 *               example: 2024-01-22
 *              dayCategory:
 *               type: string
 *               example: Hari Libur
 *              price:
 *               type: number
 *    responses:
 *      201:
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
 *                  dateOfDeparture:
 *                      type: string
 *                  dayCategory:
 *                      type: string
 *                  price:
 *                      type: number
 *                  createdDate:
 *                      type: date
 *                  updatedDate:
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
router.post('/api/v1/dates/baseprice', authToken, basePriceDateController.saveBasePriceDate)

/**
 * @openapi
 * /api/v1/dates/baseprice:
 *  get:
 *    summary: Get All Base Price Date
 *    description: Get All Base Price Date
 *    tags:
 *      - Dates
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
 *                      id:
 *                          type: string
 *                      dateOfDeparture:
 *                          type: string
 *                      dayCategory:
 *                          type: string
 *                      price:
 *                          type: number
 *                      createdDate:
 *                          type: date
 *                      updatedDate:
 *                          type: date
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
 *                  example: Base Price Dates Not Found
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
router.get('/api/v1/dates/baseprice', authToken, basePriceDateController.getAllBasePriceDate)

/**
 * @openapi
 * /api/v1/dates/baseprice/{id}:
 *  patch:
 *    summary: Update Base Price Date By Id
 *    description: Update Base Price Date By Id
 *    tags:
 *      - Dates
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          format: uuid
 *        description: UUID of base price date
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              dateOfDeparture:
 *               type: date
 *               example: 2024-01-22
 *              dayCategory:
 *               type: string
 *               example: Hari Biasa
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
 *                  dateOfDeparture:
 *                      type: string
 *                  dayCategory:
 *                      type: string
 *                  price:
 *                      type: number
 *                  createdDate:
 *                      type: date
 *                  updatedDate:
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
router.patch('/api/v1/dates/baseprice/:id', authToken, basePriceDateController.updateBasePriceDate)

/**
 * @openapi
 * /api/v1/dates/baseprice/{id}:
 *  get:
 *    summary: Get Base Price Date By Id
 *    description: Get Base Price Date By Id
 *    tags:
 *      - Dates
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          format: uuid
 *        description: UUID of base price date
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
 *                  dateOfDeparture:
 *                      type: string
 *                  dayCategory:
 *                      type: string
 *                  price:
 *                      type: number
 *                  createdDate:
 *                      type: date
 *                  updatedDate:
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
 *      404:
 *        description: Not Found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: ID Base Price Date Not Found
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
router.get('/api/v1/dates/baseprice/:id', authToken, basePriceDateController.getBasePriceDateById)

/**
 * @openapi
 * /api/v1/dates/baseprice/{id}:
 *  delete:
 *    summary: Delete Base Price Date By Id
 *    description: Delete Base Price Date By Id
 *    tags:
 *      - Dates
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          format: uuid
 *        description: UUID of base price date
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
 *      403:
 *        description: Forbidden
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Forbidden because the private key or token is invalid
 *      404:
 *        description: Not Found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: ID Base Price Date Not Found
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
router.delete('/api/v1/dates/baseprice/:id', authToken, basePriceDateController.deleteBasePriceDate)

/**
 * @openapi
 * /api/v1/companies:
 *  get:
 *    summary: Get All Company Maskapai
 *    description: Get All Company Maskapai
 *    tags:
 *      - Companies
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
 *                      id:
 *                          type: string
 *                      name:
 *                          type: string
 *                      url:
 *                          type: string
 *                      created_date:
 *                          type: date
 *                      updated_date:
 *                          type: date
 *                      deleted_date:
 *                          type: date
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
 *                  example: Company Not Found
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
router.get('/api/v1/companies', authToken, companyController.getAllCompany)

/**
 * @openapi
 * /api/v1/airplanes:
 *  post:
 *    summary: Create Airplane
 *    description: Create new Airplane
 *    tags:
 *      - Airplanes
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              airplaneName:
 *               type: string
 *               example: Airbus A320
 *              airplaneCode:
 *               type: string
 *               example: PH295
 *              airplanePrice:
 *               type: number
 *              url:
 *               type: string
 *               example: (optional if you want to add or update logo maskapai)
 *              companyId:
 *               type: string
 *    responses:
 *      201:
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
 *                  name:
 *                      type: string
 *                  code:
 *                      type: string
 *                  airplane_price:
 *                      type: number
 *                  company_id:
 *                      type: string
 *                  created_date:
 *                      type: date
 *                  updated_date:
 *                      type: date
 *                  deleted_date:
 *                      type: date
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
router.post('/api/v1/airplanes', authToken, airplaneController.createAirplane)

/**
 * @openapi
 * /api/v1/airplanes:
 *  get:
 *    summary: Get All Airplane
 *    description: Get All Airplane
 *    tags:
 *      - Airplanes
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
 *                      id:
 *                          type: string
 *                      airlineName:
 *                          type: string
 *                      url:
 *                          type: string
 *                      airplaneName:
 *                          type: string
 *                      airplaneCode:
 *                          type: string
 *                      airplanePrice:
 *                          type: number
 *                      companyId:
 *                          type: string
 *                      created_date:
 *                          type: date
 *                      updated_date:
 *                          type: date
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
 *                  example: Airplanes Not Found
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
router.get('/api/v1/airplanes', authToken, airplaneController.getAllAirplane)

/**
 * @openapi
 * /api/v1/airplanes/{id}:
 *  patch:
 *    summary: Update Airplane By Id
 *    description: Update Airplane By Id
 *    tags:
 *      - Airplanes
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          format: uuid
 *        description: UUID of airplane
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              airplaneName:
 *               type: string
 *               example: Airbus A320
 *              airplaneCode:
 *               type: string
 *               example: PH295
 *              airplanePrice:
 *               type: number
 *              url:
 *               type: string
 *               example: link logo maskapai (optional)
 *              companyId:
 *               type: string
 *               example: uuid of company (optional If you want to update the URL of the maskapai logo, you must also fill out the URL field.)
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
 *                  airlineName:
 *                      type: string
 *                  url:
 *                      type: string
 *                  airplaneName:
 *                      type: string
 *                  airplaneCode:
 *                      type: string
 *                  airplanePrice:
 *                      type: number
 *                  companyId:
 *                      type: string
 *                  created_date:
 *                      type: date
 *                  updated_date:
 *                      type: date
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
 *      400:
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: number
 *                message:
 *                  type: string
 *                  example: Bad Request
 *      404:
 *        description: Not Found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: number
 *                message:
 *                  type: string
 *                  example: ID Airplane Not Found
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
router.patch('/api/v1/airplanes/:id', authToken, airplaneController.updateAirplaneById)

/**
 * @openapi
 * /api/v1/airplanes/{id}:
 *  get:
 *    summary: Get Airplane By Id
 *    description: Get Airplane By Id
 *    tags:
 *      - Airplanes
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          format: uuid
 *        description: UUID of airplane
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
 *                  airlineName:
 *                      type: string
 *                  url:
 *                      type: string
 *                  airplaneName:
 *                      type: string
 *                  airplaneCode:
 *                      type: string
 *                  airplanePrice:
 *                      type: number
 *                  companyId:
 *                      type: string
 *                  created_date:
 *                      type: date
 *                  updated_date:
 *                      type: date
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
 *      400:
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: number
 *                message:
 *                  type: string
 *                  example: Bad Request
 *      404:
 *        description: Not Found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: number
 *                message:
 *                  type: string
 *                  example: ID Airplane Not Found
 *                data:
 *                  type: array
 *                  example: {}
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: number
 *                message:
 *                  type: string
 *                  example: Internal Server Error
 */
router.get('/api/v1/airplanes/:id', authToken, airplaneController.getAirplaneById)

/**
 * @openapi
 * /api/v1/airplanes/{id}:
 *  delete:
 *    summary: Delete Airplane By Id
 *    description: Delete Airplane By Id
 *    tags:
 *      - Airplanes
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          format: uuid
 *        description: UUID of airplane
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
 *      400:
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: number
 *                message:
 *                  type: string
 *                  example: Bad Request
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
 *                message:
 *                  type: string
 *                  example: ID Airplane Not Found
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: number
 *                message:
 *                  type: string
 *                  example: Internal Server Error
 */
router.delete('/api/v1/airplanes/:id', authToken, airplaneController.deleteAirplaneById)

router.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

export default router
