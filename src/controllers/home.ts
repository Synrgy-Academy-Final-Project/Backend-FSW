import type { Request, Response } from 'express'

export class HomeController {
    public index = (_: Request, res: Response): void => {
        res.render('home')
    }
}
