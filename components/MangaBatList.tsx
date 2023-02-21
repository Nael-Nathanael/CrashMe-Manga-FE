'use client'

import {useEffect, useState} from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

interface MangaDatum {
    url: string,
    title: string,
    thumbnail: string
}

export default function MangaBatList() {
    const [data, setData] = useState<MangaDatum[]>([])
    const [fetched, setFetched] = useState(false)

    useEffect(() => {
        if (fetched) return

        axios.get("http://127.0.0.1:8000/manga/list/mangabat/")
            .then(e => e.data)
            .then(e => {
                setData(e)
                setFetched(true)
            })
    })

    if (!fetched) {
        return <>Loading...</>
    }

    return <div className={"row gy-3 pb-3"}>
        {data.map(datum =>
            <Link href={`/read/mangabat?url=${datum.url}`} key={datum.url} className={"col-2"}>
                <div className="card bg-dark shadow border-light h-100">
                    <div className={'w-100 position-relative'} style={{minHeight: "300px"}}>
                        <Image src={datum.thumbnail} alt={datum.title} fill
                               style={{
                                   objectFit: 'cover',
                                   objectPosition: 'center'
                               }}
                               className={'rounded-top'}
                        />
                    </div>
                    <div className="card-body lh-sm">
                        {datum.title}
                    </div>
                </div>
            </Link>
        )}
    </div>
}