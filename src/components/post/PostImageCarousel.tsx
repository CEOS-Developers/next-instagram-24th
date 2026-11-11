"use client";

import { useState } from "react";
import Image from "next/image";
import type { PostImage } from "@/types/post";

export type PostImageCarouselProps = {
  images: PostImage[];
  sizes: string;
  className?: string;
};

export default function PostImageCarousel({
  images,
  sizes,
  className = "",
}: PostImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const hasMultiple = images.length > 1;

  return (
    <div
      role={hasMultiple ? "region" : undefined}
      aria-roledescription={hasMultiple ? "캐러셀" : undefined}
      aria-label={hasMultiple ? `사진 ${images.length}장` : undefined}
      className={`relative overflow-hidden bg-black ${className}`}
    >
      <ul
        className="flex h-full transition-transform duration-300 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((image, i) => (
          <li
            key={`${image.url}-${i}`}
            aria-hidden={i !== index}
            aria-label={hasMultiple ? `${images.length}장 중 ${i + 1}번째` : undefined}
            className="relative h-full w-full shrink-0"
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              priority={i === 0}
              sizes={sizes}
              className="object-contain"
            />
          </li>
        ))}
      </ul>

      {hasMultiple && (
        <>
          {index > 0 && (
            <CarouselButton direction="prev" onClick={() => setIndex(index - 1)} />
          )}
          {index < images.length - 1 && (
            <CarouselButton direction="next" onClick={() => setIndex(index + 1)} />
          )}

          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-4 flex justify-center gap-1"
          >
            {images.map((image, i) => (
              <span
                key={`${image.url}-${i}`}
                className={`size-1.5 rounded-full transition-colors ${
                  i === index ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function CarouselButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  const isPrev = direction === "prev";

  return (
    <button
      type="button"
      aria-label={isPrev ? "이전 사진" : "다음 사진"}
      onClick={onClick}
      className={`absolute top-1/2 flex size-[26px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/80 text-neutral-800 shadow-sm transition-opacity hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
        isPrev ? "left-3" : "right-3"
      }`}
    >
      <svg
        width={14}
        height={14}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path d={isPrev ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
      </svg>
    </button>
  );
}
