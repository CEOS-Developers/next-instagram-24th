"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Post } from "@/data/posts";
import PostPhoto from "@/components/PostPhoto";

type PostGalleryProps = {
  images: Post["images"];
};

const arrowClassName =
  "absolute top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-black shadow-sm hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export default function PostGallery({ images }: PostGalleryProps) {
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <section aria-label="게시물 사진" className="relative aspect-[4/5] w-full min-w-0 shrink-0 self-start bg-gray-100">
      <PostPhoto
        image={images[imageIndex]}
        sizes="(min-width: 768px) 60vw, (min-width: 640px) 50vw, 100vw"
      />
      {images.length > 1 && (
        <>
          <p aria-live="polite" aria-atomic="true" className="absolute top-3 right-3 rounded-full bg-black/60 px-2 py-1 text-xs text-white">
            <span className="sr-only">사진 </span>{imageIndex + 1} / {images.length}
          </p>
          {imageIndex > 0 && (
            <button
              type="button"
              aria-label="이전 사진"
              className={`${arrowClassName} left-3`}
              onClick={() => setImageIndex(imageIndex - 1)}
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
          )}
          {imageIndex < images.length - 1 && (
            <button
              type="button"
              aria-label="다음 사진"
              className={`${arrowClassName} right-3`}
              onClick={() => setImageIndex(imageIndex + 1)}
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          )}
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 rounded-full bg-black/40 px-1">
            {images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                aria-label={`${index + 1}번째 사진 보기`}
                aria-current={index === imageIndex ? "true" : undefined}
                onClick={() => setImageIndex(index)}
                className="grid size-6 place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-white"
              >
                <span aria-hidden="true" className={`size-1.5 rounded-full ${index === imageIndex ? "bg-white" : "bg-white/50"}`} />
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
