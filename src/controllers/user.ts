import type { Request, Response } from 'express'
import { readFileSync } from 'fs'
import jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import path from 'path'
import { UserService } from '../service/users'

export class UserController {
    readonly userService: UserService
    readonly privateKey: Buffer

    public constructor() {
        this.userService = new UserService()
        this.privateKey = readFileSync(path.join(process.cwd(), 'keys', 'jwtRS256.key'))
    }

    public login = async (req: Request, res: Response): Promise<Response<unknown, Record<string, unknown>>> => {
        try {
            const email = req.body.email as string
            const password = req.body.password as string

            const user = await this.userService.getUserByEmail(email)
            console.log(user)

            if (!(await bcrypt.compare(password, user[0].password))) {
                throw new Error()
            }

            if (user[0].role_name !== 'ROLE_ADMIN') {
                return res.status(403).json({
                    err: {
                        type: 'Forbidden',
                        name: 'ForbiddenError',
                        data: {
                            message: 'You are not allowed to access this resource',
                        },
                        statusCode: 403,
                    },
                })
            }
            // token will expire in one hour
            const token = jwt.sign(
                {
                    id: user[0].id,
                    email: user[0].email,
                    fist_name: user[0].first_name,
                    last_name: user[0].last_name,
                    role: user[0].role_name,
                    active: user[0].user_active,
                },
                this.privateKey,
                {
                    expiresIn: '1h',
                    algorithm: 'RS256',
                }
            )

            return res.status(200).json({ token })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error(err)

            if (err.type === 'NotFound') {
                err.data = {
                    message: 'Email or Password is Wrong',
                }
                return res.status(404).json({ err })
            }

            return res.status(404).json({
                err: {
                    type: 'NotFound',
                    name: 'NotFoundError',
                    data: {
                        message: 'Email or Password is Wrong',
                    },
                    statusCode: 404,
                },
            })
        }
    }

    public profile = async (req: Request, res: Response): Promise<Response<unknown, Record<string, unknown>>> => {
        return res.status(200).json(req.user)
    }
}
