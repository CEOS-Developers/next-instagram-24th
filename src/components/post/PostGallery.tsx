"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

type GalleryProps = {
  images: string[];
  caption: string;
  postHref?: string;
  preload?: boolean;
};

export default function PostGallery({ images, caption, postHref, preload }: GalleryProps) {
  const [index, setIndex] = useState(0);
  const buttonStyle = "absolute top-1/2 -translate-y-1/2 rounded-full bg-black/65 px-3 py-1 text-xl text-white";
  const photo = (
    <Image src={images[index]} alt={caption || "게시물 사진"} fill
      sizes={postHref ? "(min-width: 1280px) 31vw, (max-width: 680px) 100vw, 680px" : "(min-width: 768px) 55vw, 100vw"}
      className={postHref ? "object-cover" : "object-contain"} preload={preload && index === 0} />
  );
  return (
    <div className={`relative bg-neutral-100 ${postHref ? "aspect-[4/5] overflow-hidden rounded-sm" : "aspect-square self-start"}`}>
      {postHref ? <Link href={postHref} className="absolute inset-0">{photo}</Link> : photo}
      {images.length > 1 && (
        <>
          <span aria-live="polite" className="absolute right-3 top-3 rounded-full bg-black/65 px-2 py-1 text-xs text-white">
            {index + 1} / {images.length}
          </span>
          {index > 0 && <button aria-label="이전 사진" className={buttonStyle + " left-2"} onClick={() => setIndex(index - 1)}>‹</button>}
          {index < images.length - 1 && <button aria-label="다음 사진" className={buttonStyle + " right-2"} onClick={() => setIndex(index + 1)}>›</button>}
        </>
      )}
    </div>
  );
}
