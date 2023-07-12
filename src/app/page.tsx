"use client";

import useSWR from "swr";
import apiRoutes from "@/config/api-routes";
import axios from "axios";
import { HomeListInterface } from "@/config/interfaces";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { data, error } = useSWR<HomeListInterface[]>(apiRoutes.global.list, async () => {
    const result = await axios.get(apiRoutes.global.list)
    return result.data;
  })

  return (
    <main className="container px-3 sm:px-0 py-4">
      <div>
        { !!data && data.map((datum) => {
          return (
            <div key={ datum.id } className={ "mb-6" }>
              <h1 className={ "text-3xl mb-4" }>
                { datum.label }
              </h1>
              <div
                className={ "grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3" }>
                { datum.mangas.map(manga => {
                  return (
                    <Link href={ `detail?url=${ manga.url }` } className={ "border rounded relative" }
                          key={ manga.url }>
                      <div className={ "h-[200px] sm:h-[300px] relative" }>
                        <Image src={ manga.thumbnail } alt={ manga.title } fill style={ {
                          objectFit: 'cover'
                        } }/>
                      </div>
                      <div className="absolute top-0 left-0 w-full h-full" style={ {
                        backgroundImage: 'linear-gradient(to bottom, transparent 0%, black 100%)'
                      } }/>
                      <div className="text-center leading-none p-3 absolute bottom-0 w-full">
                        { manga.title }
                      </div>
                    </Link>
                  )
                }) }
              </div>
            </div>
          )
        }) }
      </div>
    </main>
  )
}