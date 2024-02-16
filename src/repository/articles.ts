import { raw } from 'objection'
import { ArticlesModel } from '../models/articles'

export class ArticleRepository {
  public findAll = async (): Promise<ArticlesModel[]> => {
    return await ArticlesModel.query().throwIfNotFound()
  }

  public search = async (query: string): Promise<ArticlesModel[]> => {
    return await ArticlesModel.query()
      .whereRaw(`LOWER(nama_tempat_wisata) LIKE LOWER('%${query}%')`)
      .orWhereRaw(`LOWER(lokasi_wisata) LIKE LOWER('%${query}%')`)
      .orWhereRaw(`LOWER(deskripsi) LIKE LOWER('%${query}%')`)
      .orderBy('nama_tempat_wisata', 'DESC')
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
