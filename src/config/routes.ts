/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { HomeController } from '../controllers/home'
import { UserController } from '../controllers/user'
import { swaggerSpec } from './swagger'
import swaggerUI from 'swagger-ui-express'
import { authToken } from '../middlewares/authToken'

const router = express.Router()

const homeController = new HomeController()
const userController = new UserController()

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
 *                name:
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
 */
router.get('/api/v1/users/profile', authToken, userController.profile)

router.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

export default router
