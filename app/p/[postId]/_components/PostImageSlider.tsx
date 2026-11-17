"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { PostImage } from "@/types/post";

type PostImageSliderProps = {
  images: PostImage[];
};

export default function PostImageSlider({ images }: PostImageSliderProps) {
  const [current, setCurrent] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const hasMultipleImages = images.length > 1;

  // 스크롤할 때마다 지금 몇 번째 사진인지 계산
  function handleScroll() {
    const list = listRef.current;
    if (!list?.clientWidth) return;
    const index = Math.round(list.scrollLeft / list.clientWidth);
    setCurrent(Math.max(0, Math.min(index, images.length - 1)));
  }

  // 버튼을 누르면 해당 사진 위치로 스크롤
  function goTo(index: number) {
    const list = listRef.current;
    if (!list || index < 0 || index >= images.length) return;
    list.scrollTo({ left: index * list.clientWidth, behavior: "smooth" });
  }

  return (
    <div className="relative">
      {/* 사진 목록 (가로 스크롤) */}
      <div
        ref={listRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none]"
      >
        {images.map(({ src, alt }, index) => (
          <div key={src} aria-hidden={index !== current} className="relative aspect-[3/4] w-full shrink-0 snap-center bg-black">
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 430px) 100vw, 430px"
              loading={index === 0 ? "eager" : "lazy"}
              className="object-contain"
            />
          </div>
        ))}
      </div>

      {hasMultipleImages && (
        <button
          type="button"
          aria-label="이전 사진"
          aria-disabled={current === 0}
          onClick={() => goTo(current - 1)}
          className="absolute top-1/2 left-2 -translate-y-1/2 cursor-pointer rounded-full bg-white/80 p-1 aria-disabled:cursor-default aria-disabled:opacity-50"
        >
          <Image src="/icons/arrow.svg" alt="" width={16} height={16} className="-rotate-90" />
        </button>
      )}

      {hasMultipleImages && (
        <button
          type="button"
          aria-label="다음 사진"
          aria-disabled={current === images.length - 1}
          onClick={() => goTo(current + 1)}
          className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer rounded-full bg-white/80 p-1 aria-disabled:cursor-default aria-disabled:opacity-50"
        >
          <Image src="/icons/arrow.svg" alt="" width={16} height={16} className="rotate-90" />
        </button>
      )}

      {/* 점 표시: 2장 이상일 때만 */}
      {hasMultipleImages && (
        <>
          <span role="status" className="sr-only">총 {images.length}장 중 {current + 1}번째 사진</span>
          <div aria-hidden="true" className="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1 rounded-full bg-black/60 px-2 py-1">
            {images.map(({ src }, index) => (
              <span
                key={src}
                className={`size-1.5 rounded-full ${index === current ? "bg-white" : "bg-white/50"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
