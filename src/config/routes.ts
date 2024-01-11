/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { HomeController } from '../controllers/home'
import { UserController } from '../controllers/user'
import { swaggerSpec } from './swagger'
import swaggerUI from 'swagger-ui-express'

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
 *      - Users
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
 *        description: Not Found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Email or Password is wrong
 */
router.post('/api/v1/auth/login', userController.login)

router.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

export default router
