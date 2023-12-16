import mangas from "../../demodata.json";
import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function Page({params}: { params: { id: string } }) {
  const manga = mangas.find(manga => manga.id ===  params.id);

  if (!manga) {
    return <div>Not found</div>
  }

  return (
    <main className={"py-3 container"}>
      <div className="d-flex gap-3 mb-3">
        <div className="w-100 flex-shrink-0 position-relative" style={{aspectRatio: "4 / 5", maxWidth: "200px"}}>
          <Image src={manga.cover} alt={manga.title} fill style={{objectFit: "cover", objectPosition: "center"}}/>
        </div>
        <div className="flex-grow-1">
          <h1 className={"h4 lh-1"}>{manga.title}</h1>
          <div className={"h5 m-0 p-0 text-secondary"}>
            <span>{manga.author}</span>
            <i className="bi bi-dot"></i>
            <span>{manga.status}</span>
          </div>
          <div>{manga.description}</div>
        </div>
      </div>
      <div className={"border-bottom border-light-subtle"}>
        {manga.chapters.map((chapter, i) => {
          return (
            <Link
              key={i}
              className={"border-top border-light-subtle py-3 d-block text-decoration-none white-link"}
              href={`/${manga.id}/${chapter.id}`}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className={"lh-1"}>{chapter.label}</div>
                  <small className="text-secondary">
                    Chapter {manga.chapters.length - i}
                  </small>
                </div>
                <div className={"small text-secondary"}>
                  {new Date(chapter.publishedAt).toLocaleString()}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </main>
  )
}