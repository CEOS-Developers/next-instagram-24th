"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { Post } from "@/data/posts";

const arrowClassName =
  "absolute top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-black hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export default function PostGallery({ images }: { images: Post["images"] }) {
  const [index, setIndex] = useState(0);

  return (
    <section aria-label="게시물 사진" className="relative aspect-[4/5] overflow-hidden bg-neutral-100 md:aspect-auto">
      <div
        className="absolute inset-0 flex transition-transform duration-300 ease-out motion-reduce:transition-none"
        style={{ transform: `translateX(${-index * 100}%)` }}
      >
        {images.map((photo, photoIndex) => (
          <div
            key={`${photo.src}-${photoIndex}`}
            aria-hidden={photoIndex !== index}
            className="relative w-full shrink-0"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              loading={photoIndex === 0 ? "eager" : "lazy"}
              sizes="(min-width: 1280px) 667px, (min-width: 768px) 56vw, 100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          {index > 0 && (
            <button type="button" aria-label="이전 사진" onClick={() => setIndex(index - 1)} className={`${arrowClassName} left-3`}>
              <ChevronLeft aria-hidden="true" className="size-5" />
            </button>
          )}
          {index < images.length - 1 && (
            <button type="button" aria-label="다음 사진" onClick={() => setIndex(index + 1)} className={`${arrowClassName} right-3`}>
              <ChevronRight aria-hidden="true" className="size-5" />
            </button>
          )}
          <p aria-live="polite" aria-atomic="true" className="sr-only">
            사진 {index + 1} / {images.length}
          </p>
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2">
            {images.map((photo, photoIndex) => (
              <button
                key={photo.src}
                type="button"
                aria-label={`${photoIndex + 1}번째 사진 보기`}
                aria-current={photoIndex === index ? "true" : undefined}
                onClick={() => setIndex(photoIndex)}
                className="grid size-6 place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-white"
              >
                <span aria-hidden="true" className={`size-1.5 rounded-full shadow-sm ${photoIndex === index ? "bg-white" : "bg-white/50"}`} />
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
