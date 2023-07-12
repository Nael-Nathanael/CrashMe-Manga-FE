export interface HomeListInterface {
  id: string
  label: string
  mangas: {
    title: string,
    url: string,
    thumbnail: string
  }[]
}

export interface MangaDetailInterface {
  title: string
  description: string
  cover: string
  author: string
  status: string
  chapters: {
    label: string
    url: string
    publishedAt: string
  }[]
}