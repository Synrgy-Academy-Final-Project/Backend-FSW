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
import { AirplaneClassController } from '../controllers/airplaneClass'
import { AirplaneFlightTimeController } from '../controllers/airplaneFlightTime'
import { TransactionController } from '../controllers/transaction'

const router = express.Router()

// list controllers
const homeController = new HomeController()
const userController = new UserController()
const paymentController = new PaymentController()
const airportController = new AirportController()
const basePriceAirportController = new BasePriceAirportController()
const basePriceDateController = new BasePriceDatesController()
const companyController = new CompanyController()
const airplaneController = new AirplaneController()
const airplaneClassController = new AirplaneClassController()
const airplaneFlightTimeController = new AirplaneFlightTimeController()
const reportTransaction = new TransactionController()

// list routes
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
 * /api/v1/summary/trx/payments:
 *  get:
 *    summary: Get transaction payments
 *    description: Get summary transaction payments
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
 *              type: object
 *              properties:
 *                 status:
 *                  type: number
 *                 message:
 *                  type: string
 *                 data:
 *                  type: object
 *                  properties:
 *                    month:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          statusCode:
 *                            type: number
 *                          transactionStatus:
 *                            type: string
 *                          transactionCount:
 *                            type: number
 *                          transactionAmount:
 *                            type: number
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
router.get('/api/v1/summary/trx/payments', authToken, paymentController.getTransactionPayments)

/**
 * @openapi
 * /api/v1/summary/trx/airlines:
 *  get:
 *    summary: Get the most soldout airlines
 *    description: Get the most soldout airlines
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
 *              type: object
 *              properties:
 *                status:
 *                  type: number
 *                message:
 *                  type: string
 *                data:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                     airlineName:
 *                      type: string
 *                     totalSoldout:
 *                      type: number
 *                     airplanes:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          airplaneName:
 *                            type: string
 *                          totalSoldout:
 *                            type: number
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
 *                  example: Most soldout airline not found
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
router.get('/api/v1/summary/trx/airlines', authToken, reportTransaction.getTheMostSoldoutAirlines)

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

/**
 * @openapi
 * /api/v1/classes/airplane:
 *  post:
 *    summary: Create Airplane Class
 *    description: Create new Airplane Class
 *    tags:
 *      - Classes Airplane
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              airplaneId:
 *               type: string
 *               example: UUID of airplane
 *              airplaneClassName:
 *               type: string
 *               example: First Class | Business | Premium Economy
 *              airplaneClassPrice:
 *               type: number
 *               example: 450000
 *              capacity:
 *               type: number
 *               example: 150
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
 *                  airplane_class:
 *                      type: string
 *                  airplane_class_price:
 *                      type: number
 *                  airplane_id:
 *                      type: string
 *                  capacity:
 *                      type: number
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
router.post('/api/v1/classes/airplane', authToken, airplaneClassController.createAirplaneClass)

/**
 * @openapi
 * /api/v1/classes/airplane/{id}:
 *  patch:
 *    summary: Update Airplane Class By Id
 *    description: Update Airplane Class By Id
 *    tags:
 *      - Classes Airplane
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          format: uuid
 *        description: UUID of airplane class
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              airplaneId:
 *               type: string
 *               example: UUID of airplane
 *              airplaneClassName:
 *               type: string
 *               example: First Class | Business | Premium Economy
 *              airplaneClassPrice:
 *               type: number
 *              capacity:
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
 *                  airplane_class:
 *                      type: string
 *                  airplane_class_price:
 *                      type: number
 *                  airplane_id:
 *                      type: string
 *                  capacity:
 *                      type: number
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
router.patch('/api/v1/classes/airplane/:id', authToken, airplaneClassController.updateAirplaneClassById)

/**
 * @openapi
 * /api/v1/classes/airplane/{id}:
 *  get:
 *    summary: Get Airplane Class By airplaneId
 *    description: Get Airplane Class By airplaneId
 *    tags:
 *      - Classes Airplane
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
 *                  airplaneName:
 *                      type: string
 *                  airplaneClassName:
 *                      type: string
 *                  capacity:
 *                      type: number
 *                  airplaneClassPrice:
 *                      type: number
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
router.get('/api/v1/classes/airplane/:id', authToken, airplaneClassController.getAirplaneClassByAirplaneId)

/**
 * @openapi
 * /api/v1/classes/airplane/{id}:
 *  delete:
 *    summary: Delete Airplane Class By Id
 *    description: Delete Airplane Class By Id
 *    tags:
 *      - Classes Airplane
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          format: uuid
 *        description: UUID of airplane class
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
router.delete('/api/v1/classes/airplane/:id', authToken, airplaneClassController.deleteAirplaneClassById)

/**
 * @openapi
 * /api/v1/flightimes/airplane:
 *  post:
 *    summary: Create Airplane Flight Times
 *    description: Create new Airplane Flight Times
 *    tags:
 *      - Flight Times Airplane
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              airplaneId:
 *               type: string
 *               example: UUID of airplane
 *              flightTime:
 *               type: string
 *               example: 07:00:00
 *              airplaneFlightTimePrice:
 *               type: number
 *               example: 450000
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
 *                  flight_time:
 *                      type: string
 *                  airplane_flight_time_price:
 *                      type: number
 *                  airplane_id:
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
 *                  example: Flight Time Airplane is already exist with this airplaneId
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
router.post('/api/v1/flightimes/airplane', authToken, airplaneFlightTimeController.createAirplaneFlightTime)

/**
 * @openapi
 * /api/v1/flightimes/airplane/{id}:
 *  patch:
 *    summary: Update Airplane Flight Times By Id
 *    description: Update Airplane Flight Times By Id
 *    tags:
 *      - Flight Times Airplane
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          format: uuid
 *        description: UUID of airplane flight time
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              airplaneId:
 *               type: string
 *               example: UUID of airplane
 *              flightTime:
 *               type: string
 *               example: 07:00:00
 *              airplaneFlightTimePrice:
 *               type: number
 *               example: 450000
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
 *                  flight_time:
 *                      type: string
 *                  airplane_flight_time_price:
 *                      type: number
 *                  airplane_id:
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
 *                  example: Flight Time Airplane is already exist with this airplaneId
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
router.patch('/api/v1/flightimes/airplane/:id', authToken, airplaneFlightTimeController.updateAirplaneFlightTimeById)

/**
 * @openapi
 * /api/v1/flightimes/airplane/{id}:
 *  get:
 *    summary: Get Airplane Flight Times By airplaneId
 *    description: Get Airplane Flight Times By airplaneId
 *    tags:
 *      - Flight Times Airplane
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
 *                  airplaneName:
 *                      type: string
 *                  flightTime:
 *                      type: string
 *                  airplaneFlightTimePrice:
 *                      type: number
 *                  aiplaneId:
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
router.get('/api/v1/flightimes/airplane/:id', authToken, airplaneFlightTimeController.getAirplaneFlightTimeByAirplaneId)

/**
 * @openapi
 * /api/v1/flightimes/airplane/{id}:
 *  delete:
 *    summary: Delete Airplane Flight Times By Id
 *    description: Delete Airplane Flight Times By Id
 *    tags:
 *      - Flight Times Airplane
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          format: uuid
 *        description: UUID of airplane flight time
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
router.delete('/api/v1/flightimes/airplane/:id', authToken, airplaneFlightTimeController.deleteAirplaneClassById)

/**
 * @openapi
 * /api/v1/transactions/report:
 *  get:
 *    summary: Get report transactions
 *    description: Get report transactions
 *    tags:
 *      - Transactions
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
 *                first_name:
 *                  type: string
 *                last_name:
 *                  type: string
 *                departure_code:
 *                  type: string
 *                arrival_code:
 *                  type: string
 *                transaction_time:
 *                  type: string
 *                airline:
 *                  type: string
 *                total_price:
 *                  type: number
 *                transaction_status:
 *                  type: string
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
 *                  example: Report transaction not found
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
router.get('/api/v1/transactions/report', authToken, reportTransaction.getReportTransaction)

router.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

export default router
