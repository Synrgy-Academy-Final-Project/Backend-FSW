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

  public getWisataByLocation = async (location: string): Promise<ArticlesModel[]> => {
    return await this.articleRepository.searchByLocation(location)
  }

  public addLikeWisata = async (id: string, like: number): Promise<ArticlesModel[]> => {
    return await this.articleRepository.addLike(id, like)
  }
}
