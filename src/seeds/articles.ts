import type { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  // await knex('articles').del().where('id', 'f05033c7-3efc-4ad1-b4f7-14c3948c3032')

  // Inserts seed entries
  await knex('articles').insert([
    {
      nama_tempat_wisata: 'Pantai Kuta, Bali',
      deskripsi:
        'Pantai Kuta merupakan salah satu pantai paling terkenal di Bali, dengan pasir putih yang lembut dan ombak yang cocok untuk berselancar. Tempat ini juga dikenal karena kehidupan malamnya yang ramai.',
      lokasi_wisata: 'Kuta, Kabupaten Badung, Bali, Indonesia.',
      link_gambar:
        'https://i2.wp.com/blog.tripcetera.com/id/wp-content/uploads/2020/03/leebudihart_76864081_2484833498431751_3194446755026370817_n.jpg',
      jumlah_like: 1000,
    },
    {
      nama_tempat_wisata: 'Taman Nasional Komodo',
      deskripsi:
        'Taman Nasional Komodo adalah rumah bagi komodo, reptil raksasa yang hanya ditemukan di wilayah ini. Selain itu, taman ini menawarkan keindahan alam yang luar biasa dan trekking yang menarik.',
      lokasi_wisata: 'Nusa Tenggara Timur, Indonesia.',
      link_gambar:
        'https://www.indonesia.travel/content/dam/indtravelrevamp/id-id/ide-liburan/ke-taman-nasional-komodo-wajib-abadikan-6-spot-instagenic-ini/pulau-padar.jpg',
      jumlah_like: 800,
    },
    {
      nama_tempat_wisata: 'Danau Toba',
      deskripsi:
        'Danau Toba adalah danau vulkanik terbesar di dunia, dengan pemandangan alam yang memukau dan pulau di tengahnya, Pulau Samosir. Danau ini merupakan tempat yang sempurna untuk bersantai dan menikmati keindahan alam.',
      lokasi_wisata: 'Sumatera Utara, Indonesia.',
      link_gambar:
        'https://api2.kemenparekraf.go.id/storage/app/resources/PARIWISATA_STORYNOMICS_TOURISM_shutterstock_385096972_franshendrik_Tambunan_d03d3440db.jpg',
      jumlah_like: 1200,
    },
    {
      nama_tempat_wisata: 'Borobudur',
      deskripsi:
        'Candi Borobudur adalah salah satu peninggalan bersejarah terbesar di Indonesia dan merupakan situs Buddha terbesar di dunia. Terletak di lereng Gunung Merapi, candi ini menawarkan panorama yang indah, terutama saat matahari terbit.',
      lokasi_wisata: 'Magelang, Jawa Tengah, Indonesia.',
      link_gambar: 'https://www.indonesia.travel/content/dam/indtravelrevamp/en/destinations/revision-2019/4.jpg',
      jumlah_like: 1500,
    },
    {
      nama_tempat_wisata: 'Pulau Bunaken',
      deskripsi:
        'Pulau Bunaken terkenal karena keindahan bawah lautnya yang menakjubkan. Terletak di Taman Nasional Bunaken, pulau ini merupakan surga bagi penyelam dengan terumbu karang yang indah dan keanekaragaman hayati laut yang luar biasa.',
      lokasi_wisata: 'Sulawesi Utara, Indonesia.',
      link_gambar: 'https://www.dictio.id/uploads/db3342/original/3X/e/a/ea737698d823b61b4412d38149be551feb5611d5.jpeg',
      jumlah_like: 900,
    },
  ])
}
