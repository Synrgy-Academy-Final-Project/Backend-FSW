import { raw } from 'objection'
import { ArticlesModel } from '../models/articles'

export class ArticleRepository {
  public findAll = async (): Promise<ArticlesModel[]> => {
    return await ArticlesModel.query().throwIfNotFound()
  }

  public searchByLocation = async (location: string): Promise<ArticlesModel[]> => {
    return await ArticlesModel.query()
      .whereRaw(`LOWER(nama_tempat_wisata) LIKE LOWER('%${location}%')`)
      .throwIfNotFound()
  }

  public addLike = async (id: string, like: number): Promise<ArticlesModel[]> => {
    return await ArticlesModel.query()
      .findById(id)
      .patch({
        jumlah_like: raw(`jumlah_like + ${like}`),
      })
      .returning('*')
      .throwIfNotFound()
  }
}
