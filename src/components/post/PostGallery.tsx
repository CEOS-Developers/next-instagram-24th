"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { Post } from "@/data/posts";

export default function PostGallery({ images }: { images: Post["images"] }) {
  const [index, setIndex] = useState(0);
  const image = images[index];

  return (
    <section
      aria-label="게시물 사진"
      className="relative aspect-[4/5] overflow-hidden bg-neutral-100 dark:bg-neutral-800"
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        loading="eager"
        sizes="(min-width: 1024px) 595px, (min-width: 768px) 60vw, 100vw"
        className="object-cover"
      />

      {images.length > 1 && (
        <>
          <div className="pointer-events-none absolute inset-x-3 top-1/2 flex -translate-y-1/2 justify-between">
            <button
              type="button"
              aria-label="이전 사진"
              disabled={index === 0}
              onClick={() => setIndex(index - 1)}
              className="pointer-events-auto grid size-9 place-items-center rounded-full bg-black/65 text-white disabled:invisible"
            >
              <ChevronLeft aria-hidden="true" className="size-5" />
            </button>
            <button
              type="button"
              aria-label="다음 사진"
              disabled={index === images.length - 1}
              onClick={() => setIndex(index + 1)}
              className="pointer-events-auto grid size-9 place-items-center rounded-full bg-black/65 text-white disabled:invisible"
            >
              <ChevronRight aria-hidden="true" className="size-5" />
            </button>
          </div>
          <p
            aria-live="polite"
            className="absolute right-3 bottom-3 rounded-full bg-black/65 px-2.5 py-1 text-xs text-white"
          >
            <span className="sr-only">사진 </span>
            {index + 1} / {images.length}
          </p>
        </>
      )}
    </section>
  );
}
