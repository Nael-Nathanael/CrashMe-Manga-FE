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

export default function MangaRead(context: MangaDetailProps) {
    const [data, setData] = useState<string[]>()
    const [currentPageIndex, setCurrentPageIndex] = useState(0)

    useEffect(() => {
        if (data) return;

        // axios.get(`http://localhost:8000/manga/chapter/${context.params.source}?url=${context.searchParams.url}`)
        //     .then(e => e.data)
        //     .then(e => {
        //         setData(e)
        //     })
    })

    if (!data) {
        return <>Loading...</>
    }

    return <>
        <div className="h-100 bg-info">

        </div>
    </>
}