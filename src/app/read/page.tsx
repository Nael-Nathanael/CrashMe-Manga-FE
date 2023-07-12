'use client'

import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { MangaDetailInterface } from "@/config/interfaces";
import apiRoutes from "@/config/api-routes";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Detail() {
  const searchParams = useSearchParams()
  const chapter_url = searchParams.get('url') as string
  const [index, setIndex] = useState(0)


  const { data, error } = useSWR<string[]>(apiRoutes.global.read(chapter_url), async () => {
    const result = await axios.get(apiRoutes.global.read(chapter_url))
    return result.data;
  })


  function next() {
    if (!data) return;
    if (index === data.length - 1) return;
    setIndex(prev => prev + 1)
  }

  function back() {
    if (!data) return;
    if (index === 0) return;
    setIndex(prev => prev - 1)
  }

  if (error) return <div>Error</div>
  if (!data) return <div>Loading</div>

  return <div className={ 'relative min-h-screen' }>
    <img src={ data[index] } alt={ data[index] } style={ {
      objectFit: 'contain',
      objectPosition: 'center',
    } }
    />
  </div>
}