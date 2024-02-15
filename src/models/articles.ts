import { Model } from 'objection'
import type { ModelObject } from 'objection'

export class ArticlesModel extends Model {
  id!: string
  nama_tempat_wisata!: string
  deskripsi!: string
  lokasi_wisata!: string
  link_gambar!: string
  jumlah_like!: number
  created_at!: Date
  updated_at!: Date

  static readonly tableName = 'articles'
}

export type Articles = ModelObject<ArticlesModel>
