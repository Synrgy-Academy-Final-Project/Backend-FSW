import type { Request, Response } from 'express'

export class HomeController {
    index(_: Request, res: Response): void {
        res.render('home')
    }
}
