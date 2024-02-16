/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Request, Response } from 'express'
import { ArticleService } from '../service/articles'
import type { IReqBody, IReqParams, IReqQuery } from '../utils/types'

export class ArticleController {
  // variable hanya bisa di instance dari object article service dan tidak bisa di ubah value nya
  readonly articleService: ArticleService

  public constructor() {
    // membuat object article service pertama kali controller dijalankan
    this.articleService = new ArticleService()
  }

  // method get all data wisata

  public getAllWisata = async (_: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined> => {
    try {
      // mendapatkan semua wisata
      const wisata = await this.articleService.getAllWisata()
      // mengirim response sukses
      res.status(200).json({
        status: 200,
        message: 'Get All Wisata Successfully',
        data: wisata,
      })
      // jika terjadi error
    } catch (error: any) {
      // tampilkan error ke console
      console.error(error)
      // jika error nya status 404
      if (error.statusCode === 404) {
        // kirim response data wisata tidak ditemukan
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

  // method search wisata

  public searchWisata = async (
    req: Request<unknown, unknown, unknown, IReqQuery>,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> => {
    try {
      // mengambil data query dari client
      const { q } = req.query
      // call service untuk mendapatkan data berdasarkan query
      const wisata = await this.articleService.searchWisata(q)
      // mengirim response sukses
      res.status(200).json({
        status: 200,
        message: 'Search Wisata Successfully',
        data: wisata,
      })
      // jika terjadi error
    } catch (error: any) {
      // tampilkan error ke console
      console.error(error)
      // jika eror status 404
      if (error.statusCode === 404) {
        // kirim response 404 data wisata tidak ditemukan
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

  // method untuk menambahkan jumlah like pada wisata

  public addLikeWisata = async (
    req: Request<IReqParams, unknown, IReqBody>,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> => {
    try {
      // mengambil data params id
      const { id } = req.params
      // mengambil data body like
      const { like } = req.body
      // call service untuk menambahkan jumlah like pada wisata berdasarkan id
      const addLikeWisata = await this.articleService.addLikeWisata(id, like)
      // kirim response sukses
      res.status(200).json({
        status: 200,
        message: 'Add Likes Successfully',
        data: addLikeWisata,
      })
      // jika terjadi error
    } catch (error: any) {
      // tampilkan error ke console
      console.error(error)
      // jika error status 404
      if (error.statusCode === 404) {
        // kirim response 404 id wisata tidak ditemukan
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
