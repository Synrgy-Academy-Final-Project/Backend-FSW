import type { Request, Response } from 'express'

export class HomeController {
  // index for ejs
  public index = (_: Request, res: Response): void => {
    // render file home in views
    res.render('home')
  }
}
