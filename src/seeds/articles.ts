import type { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  // await knex('articles').del().where('id', 'f05033c7-3efc-4ad1-b4f7-14c3948c3032')

  // Inserts seed entries
  await knex('articles').insert([
    {
      nama_tempat_wisata: 'Pulau Belitung',
      deskripsi:
        'Pulau Belitung menawarkan keindahan alam yang memukau dengan pantainya yang indah, bebatuan granit yang unik, dan air laut yang jernih. Pulau ini juga terkenal dengan penyu hijau yang berkembang biak di pantainya.',
      lokasi_wisata: 'Bangka Belitung, Indonesia.',
      link_gambar: 'https://asset-2.tstatic.net/belitung/foto/bank/images/20220824-wisata-belitung-pulau-memperak.jpg',
      jumlah_like: 600,
    },
    {
      nama_tempat_wisata: 'Pulau Murotai',
      deskripsi:
        'Pulau Morotai adalah surga bagi para penyelam dengan terumbu karang yang indah dan kehidupan laut yang beragam. Pulau ini juga memiliki sejarah yang kaya sebagai bekas pangkalan militer pada masa Perang Dunia II.',
      lokasi_wisata: 'Maluku Utara, Indonesia.',
      link_gambar:
        'https://asset.kompas.com/crops/rIaDsml_U1Vwq_9p11dnEQ-Wi1M=/87x0:917x553/750x500/data/photo/2021/10/20/616fe1a3bac83.jpg',
      jumlah_like: 1400,
    },
    {
      nama_tempat_wisata: 'Taman Nasional Lorentz',
      deskripsi:
        'Taman Nasional Lorentz adalah salah satu dari sedikit tempat di dunia yang memadukan pegunungan es, hutan hujan tropis, dan pantai karang dalam satu wilayah yang luas. Taman nasional ini merupakan situs warisan dunia UNESCO.',
      lokasi_wisata: 'Papua, Indonesia.',
      link_gambar: 'https://asset-2.tstatic.net/tribunnewswiki/foto/bank/images/Taman-Nasional-Lorentz-4.jpg',
      jumlah_like: 1900,
    },
    {
      nama_tempat_wisata: 'Pulau Tidore',
      deskripsi:
        'Pulau Tidore adalah tujuan yang sempurna bagi pecinta alam dengan gunung berapi yang megah, pantai berpasir putih, dan air laut yang jernih. Pulau ini juga memiliki sejarah perdagangan rempah-rempah yang kaya.',
      lokasi_wisata: 'Maluku Utara, Indonesia.',
      link_gambar: 'https://infopublik.id/assets/upload/headline//IMG-20230316-WA0007-1.jpg',
      jumlah_like: 1700,
    },
    {
      nama_tempat_wisata: 'Taman Nasional Ujung Kulon',
      deskripsi:
        'Taman Nasional Ujung Kulon adalah rumah bagi badak Jawa yang langka dan hutan hujan tropis yang menakjubkan. Taman nasional ini juga terkenal dengan pantainya yang indah dan pulau-pulau kecilnya.',
      lokasi_wisata: 'Banten, Indonesia.',
      link_gambar:
        'https://cdn1.katadata.co.id/media/images/thumb/2022/06/13/Warisan_Dunia_di_Ujung_Barat_Jawa-2022_06_13-13_34_38_f772b50e698e33187f687c17672be65d_960x640_thumb.jpg',
      jumlah_like: 1500,
    },
    {
      nama_tempat_wisata: 'Pulau Sangihe',
      deskripsi:
        'Pulau Sangihe adalah surga bagi penyelam dengan terumbu karang yang berwarna-warni dan keanekaragaman hayati laut yang luar biasa. Pulau ini juga menawarkan pemandangan alam yang menakjubkan di atas permukaan air.',
      lokasi_wisata: 'Sulawesi Utara, Indonesia.',
      link_gambar: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Tahuna%2C_Sangihe_Islands.jpg',
      jumlah_like: 100,
    },
    {
      nama_tempat_wisata: 'Taman Nasional Baluran',
      deskripsi:
        'Taman Nasional Baluran adalah padang savana terbesar di Jawa, yang menawarkan pemandangan yang spektakuler dan keanekaragaman hayati yang unik. Taman nasional ini juga merupakan habitat bagi satwa langka seperti banteng Jawa dan rusa bawean.',
      lokasi_wisata: 'Kabupaten Situbondo, Jawa Timur, Indonesia.',
      link_gambar:
        'https://asset.kompas.com/crops/H-tXVGtoTcPWQ7uvdXpjwuAas20=/81x0:1281x800/750x500/data/photo/2022/02/19/621052f23c2d4.jpeg',
      jumlah_like: 2000,
    },
  ])
}
