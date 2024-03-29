import type { Request, Response } from 'express'

export const routeNotFound = (req: Request, res: Response): void => {
    res.status(404).json({
        status: 'Fail',
        message: `Endpoint ${req.originalUrl} is not registered on the server!`,
        statusCode: 404,
    })
}
