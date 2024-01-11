import type { Request, Response } from 'express'
import { readFileSync } from 'fs'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import path from 'path'
import { UserService } from '../service/users'

export class UserController {
    userService: UserService
    privateKey: Buffer

    public constructor() {
        this.userService = new UserService()
        this.privateKey = readFileSync(path.join(process.cwd(), 'keys', 'jwtRS256.key'))
    }

    login = async (req: Request, res: Response): Promise<Response<unknown, Record<string, unknown>>> => {
        try {
            const email = req.body.email as string
            const password = req.body.password as string

            const user = await this.userService.getUserByEmail(email)

            console.log(user)

            if (!(await bcrypt.compare(password, user[0].password))) {
                throw new Error()
            }
            // token will expire in one hour
            const token = jwt.sign(
                { id: user[0].id, email: user[0].email, name: user[0].full_name, role: user[0].role_name },
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
}
