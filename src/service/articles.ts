import type { ArticlesModel } from '../models/articles'
import { ArticleRepository } from '../repository/articles'

export class ArticleService {
  readonly articleRepository: ArticleRepository

  public constructor() {
    this.articleRepository = new ArticleRepository()
  }

  public getAllWisata = async (): Promise<ArticlesModel[]> => {
    return await this.articleRepository.findAll()
  }

  public searchWisata = async (query: string): Promise<ArticlesModel[]> => {
    return await this.articleRepository.search(query)
  }

  public addLikeWisata = async (id: string, like: number): Promise<ArticlesModel[]> => {
    // membuat tanggal baru untuk update
    const updatedAt = new Date()
    return await this.articleRepository.addLike(id, like, updatedAt)
  }
}
