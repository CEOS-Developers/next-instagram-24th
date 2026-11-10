"use client";

import Image from "next/image";
import { useState } from "react";

export default function PostGallery({ images, caption }: { images: string[]; caption: string }) {
  const [index, setIndex] = useState(0);
  const buttonStyle = "absolute top-1/2 -translate-y-1/2 rounded-full bg-black/65 px-3 py-1 text-xl text-white";
  return (
    <div className="relative aspect-square self-start bg-neutral-100">
      <Image src={images[index]} alt={caption || "게시물 사진"} fill sizes="(min-width: 768px) 55vw, 100vw" className="object-contain" />
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
