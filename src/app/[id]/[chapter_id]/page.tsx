"use client"

import mangas from "../../../demodata.json";
import React, {useCallback, useEffect, useState} from "react";
import Link from "next/link";
import {useQueryState} from "next-usequerystate";
import {parseAsInteger} from "next-usequerystate";

export default function Page({params}: { params: { id: string, chapter_id: string } }) {
  const [page, setPage] = useQueryState('page', parseAsInteger)

  const manga = mangas.find(
    manga => manga.id === params.id
  );

  const chapterIdx = manga?.chapters.findIndex(
    chapter => chapter.id === params.chapter_id
  )

  const chapterFound = chapterIdx !== undefined && chapterIdx > -1;

  if (!chapterFound) {
    window.location.href = "/not-found"
  }

  const nextChapter = chapterIdx! > 0 ? manga!.chapters[chapterIdx! - 1] : null;
  const chapter = manga!.chapters[chapterIdx!];
  const prevChapter = manga!.chapters.length - 1 > chapterIdx! ? manga!.chapters[chapterIdx! + 1] : null;

  const prevPage = useCallback(async () => {
    if (!manga) return;
    if ((page || 1) > 1) {
      await setPage(prev => (prev || 1) - 1)
      return;
    }
    if (prevChapter) {
      window.location.href = `/${manga.id}/${prevChapter.id}?page=${prevChapter.pages.length}`
    } else {
      window.location.href = `/${manga.id}`
    }
  }, [manga, page, prevChapter, setPage])

  const nextPage = useCallback(async () => {
    if (!manga) return;
    if (chapter.pages.length - 1 >= (page || 1)) {
      await setPage(prev => (prev || 1) + 1)
      return;
    }
    if (nextChapter) {
      window.location.href = `/${manga.id}/${nextChapter.id}`
    } else {
      window.location.href = `/${manga.id}/finish`
    }
  }, [chapter.pages.length, manga, nextChapter, page, setPage])

  useEffect(() => {
    const preloadImages = async () => {
      if (!chapterFound) return;

      const imagePromises = chapter.pages.map((page) => {
        const image = new Image();
        image.src = page
        return new Promise((resolve, reject) => {
          image.onload = resolve;
          image.onerror = reject;
        });
      });

      try {
        await Promise.all(imagePromises);
      } catch (error) {
      }
    };

    preloadImages();
  }, [chapter.pages, chapterFound]);


  useEffect(() => {
    const handleKeyPress = async (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        await prevPage();
      } else if (event.key === 'ArrowRight') {
        await nextPage();
      }
    };

    // Add event listener for keydown event
    document.addEventListener('keyup', handleKeyPress);

    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener('keyup', handleKeyPress);
    };
  }, [nextPage, page, prevPage]);

  return (
    <main className={"text-center"}>
      <div className="py-2 px-1 shadow-sm w-100 text-center position-fixed top-0 start-0"
           style={{backgroundColor: "rgba(0,0,0,.6)"}}>
        <div className="container">
          {manga!.title.substring(0, 50).trim()}{manga!.title.length > 50 ? '...' : ''}
          <i className="bi bi-dot"></i>
          {chapter.label.substring(0, 50).trim()}{chapter.label.length > 50 ? '...' : ''}
        </div>
      </div>

      <img style={{height: "100dvh"}} src={chapter.pages[(page || 1) - 1]} alt={chapter.pages[(page || 1) - 1]}/>

      <div className="py-2 px-1 shadow-sm w-100 position-fixed bottom-0 start-0"
           style={{backgroundColor: "rgba(0,0,0,.6)"}}>
        <div className="container d-flex justify-content-between align-items-center">
          <div>
            <select onChange={(event) => {
              window.location.href = `/${manga!.id}/${event.target.value}`
            }} className="form-select form-select-sm" defaultValue={chapter.id}>
              {manga!.chapters.map((_chapter) => {
                return (
                  <option key={_chapter.id} value={_chapter.id}>
                    {_chapter.label}
                  </option>
                )
              })}
            </select>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <div style={{cursor: "pointer"}}
                 onClick={prevPage}
                 className={"d-flex justify-content-center align-items-center"}>
              <i className="bi bi-chevron-left"></i>
            </div>
            <div className="mx-3">
              Page {page || 1}
            </div>
            <div style={{cursor: "pointer"}}
                 onClick={nextPage}
                 className={"d-flex justify-content-center align-items-center"}>
              <i className="bi bi-chevron-right"></i>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}