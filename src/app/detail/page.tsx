'use client'

import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { MangaDetailInterface } from "@/config/interfaces";
import apiRoutes from "@/config/api-routes";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default function Detail() {
  const searchParams = useSearchParams()
  const manga_url = searchParams.get('url') as string

  const { data, error } = useSWR<MangaDetailInterface>(apiRoutes.global.detail(manga_url), async () => {
    const result = await axios.get(apiRoutes.global.detail(manga_url))
    return result.data;
  })

  if (error) return <div>Error</div>
  if (!data) return <div>Loading</div>

  return (
    <main className="container px-3 sm:px-0 py-4">
      <div>
        <h1 className="text-2xl mb-3 flex justify-between">
      <span>
      { data.title }
      </span>
          <span>
        { data.status }
      </span>
        </h1>
        <div className="flex mb-3">
          <div className="w-[300px] flex-shrink-0 me-4 h-[450px] relative rounded shadow">
            <Image src={ data.cover } alt={ data.title } quality={ 100 } fill style={ {
              objectFit: 'cover'
            } }/>
          </div>
          <div>
            <div className="mb-2">
              <h2 className="text-xl">Synopsys</h2>
              <p>{ data.description }</p>
            </div>
            <div className="mb-2">
              <h2 className="text-xl">Author</h2>
              <p>{ data.author }</p>
            </div>
            <div className="mb-2">
              <h2 className="text-xl">Chapter</h2>
              <p>{ data.chapters.length }</p>
            </div>
          </div>
        </div>
        { data.chapters.map(chapter => {
          return (
            <Link href={ `/read?url=${ chapter.url }` } key={ chapter.url }
                  className={ 'flex border-primary border hover:bg-primary justify-between w-full py-3 px-2 rounded mb-3' }>
              <span>{ chapter.label }</span>
              <span>{ chapter.publishedAt }</span>
            </Link>
          )
        }) }

      </div>
    </main>
  )
}