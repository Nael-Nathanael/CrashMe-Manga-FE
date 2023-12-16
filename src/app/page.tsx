import mangas from "../demodata.json";
import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function Page() {
  return (
    <main className={"py-3 container"}>
      <div className="d-flex flex-wrap gap-2">
        {mangas.map(e => {
          return (
            <Link
              href={"/" + e.id}
              style={{aspectRatio: "4 / 5", width: "150px"}}
              key={e.id}
            >
              <div className="position-relative h-100">
                <Image src={e.thumbnail}
                       className={"rounded"}
                       alt={e.title} fill style={{
                  objectFit: "cover",
                  objectPosition: "center"
                }}/>
                <div
                  className={"position-absolute rounded lh-1 top-0 start-0 w-100 h-100 d-flex align-items-end p-1 small"}
                  style={{
                    background: "linear-gradient(0deg, rgba(0,0,0,0.4814718123577556) 0%, rgba(255,0,0,0) 44%)"
                  }}>
                  <div style={{
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    paddingBottom: "3px"
                  }} className={"white-link"}>
                    {e.title}
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </main>
  )
}