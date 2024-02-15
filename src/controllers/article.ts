/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Request, Response } from 'express'
import { ArticleService } from '../service/articles'
import type { IReqBody, IReqParams, IReqQuery } from '../utils/types'

export class ArticleController {
  readonly articleService: ArticleService

  public constructor() {
    this.articleService = new ArticleService()
  }

  public getAllWisata = async (_: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined> => {
    try {
      const wisata = await this.articleService.getAllWisata()

      res.status(200).json({
        status: 200,
        message: 'Get All Wisata Successfully',
        data: wisata,
      })
    } catch (error: any) {
      console.error(error)

      if (error.statusCode === 404) {
        return res.json({
          status: 404,
          message: 'Wisata Not Found',
          data: [],
        })
      }

      res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
      })
    }
  }

  public getWisataByLocation = async (
    req: Request<unknown, unknown, unknown, IReqQuery>,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> => {
    try {
      const { location } = req.query

      console.log(location)

      const wisata = await this.articleService.getWisataByLocation(location)

      res.status(200).json({
        status: 200,
        message: 'Get Wisata by Location Successfully',
        data: wisata,
      })
    } catch (error: any) {
      console.error(error)

      if (error.statusCode === 404) {
        return res.status(404).json({
          status: 404,
          message: 'Data Wisata Not Found',
          data: [],
        })
      }

      res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
      })
    }
  }

  public addLikeWisata = async (
    req: Request<IReqParams, unknown, IReqBody>,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> => {
    try {
      const { id } = req.params
      const { like } = req.body

      console.log(id)
      console.log(like)

      const addLikeWisata = await this.articleService.addLikeWisata(id, like)

      res.status(200).json({
        status: 200,
        message: 'Add Likes Successfully',
        data: addLikeWisata,
      })
    } catch (error: any) {
      console.error(error)

      if (error.statusCode === 404) {
        return res.status(404).json({
          status: 404,
          message: 'ID Wisata Not Found',
        })
      }

      res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
      })
    }
  }
}
