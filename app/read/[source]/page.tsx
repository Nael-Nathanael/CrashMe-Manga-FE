'use client'

import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link"

interface MangaDetailProps {
    params: {
        source: string
    },
    searchParams: {
        url: string
    }
}

interface MangaBatData {
    title: string,
    author: string,
    cover: string,
    description: string,
    status: string,
    chapters: {
        label: string,
        publishedAt: string,
        url: string
    }[]
}

export default function MangaDetail(context: MangaDetailProps) {
    const [data, setData] = useState<MangaBatData>()

    useEffect(() => {
        if (data) return;

        axios.get(`http://localhost:8000/manga/manga/${context.params.source}?url=${context.searchParams.url}`)
            .then(e => e.data)
            .then(e => {
                setData(e)
            })
    })

    if (!data) {
        return <>Loading...</>
    }

    return <>
        <div className="row gy-3">
            <div className="col-2">
                <div className={'position-relative w-100'} style={{minHeight: '300px'}}>
                    <Image src={data.cover} alt={data.title} fill style={{
                        objectFit: 'cover',
                        objectPosition: 'center'
                    }}/>
                </div>
            </div>
            <div className="col-9">
                <div className="mb-3">
                    <div className="d-flex align-items-center">
                        <h1 className={'h4 mb-0'}>
                            {data.title}
                        </h1>
                        <sup className={'ms-2'}>
                            <span className="badge bg-info small">{data.status}</span>
                        </sup>
                    </div>
                    <small>{data.author}</small>
                    <br/>
                </div>
                <p>{data.description}</p>
            </div>
            <div className="col-12">
                {data.chapters.map(chapter =>
                    <Link href={`/read/${context.params.source}/chapter?url=${chapter.url}`} key={chapter.url}
                          className={'w-100 card card-body border-light bg-dark py-2 mb-2'}>
                        <div className="d-flex justify-content-between align-items-center">
                            {chapter.label}
                            <div className="d-lg-block d-none">
                                {chapter.url}
                            </div>
                        </div>
                    </Link>
                )}
            </div>
        </div>
    </>
}