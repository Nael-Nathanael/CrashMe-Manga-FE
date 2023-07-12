import { HomeListInterface } from "@/config/interfaces";

const base_url = 'http://localhost:8000'

const apiRoutes = {
  global: {
    list: `${ base_url }`,
    detail: (manga_url: string) => `${ base_url }/detail?url=${manga_url}`,
    read: (chapter_url: string) => `${ base_url }/read?url=${chapter_url}`
  }
}

export default apiRoutes
