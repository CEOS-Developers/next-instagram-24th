"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type PostImageSliderProps = {
  images: string[];
  alt: string;
};

export default function PostImageSlider({ images, alt }: PostImageSliderProps) {
  const [current, setCurrent] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  // 스크롤할 때마다 지금 몇 번째 사진인지 계산
  function handleScroll() {
    const list = listRef.current;
    if (!list) return;
    setCurrent(Math.round(list.scrollLeft / list.clientWidth));
  }

  // 버튼을 누르면 해당 사진 위치로 스크롤
  function goTo(index: number) {
    const list = listRef.current;
    if (!list) return;
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
        {images.map((src, index) => (
          <div key={src} className="relative aspect-[3/4] w-full shrink-0 snap-center">
            <Image
              src={src}
              alt={`${alt} (${index + 1}/${images.length})`}
              fill
              sizes="(max-width: 430px) 100vw, 430px"
              loading={index === 0 ? "eager" : "lazy"}
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* 이전 버튼: 첫 장이 아닐 때만 */}
      {current > 0 && (
        <button
          type="button"
          aria-label="이전 사진"
          onClick={() => goTo(current - 1)}
          className="absolute top-1/2 left-2 -translate-y-1/2 cursor-pointer rounded-full bg-white/80 p-1"
        >
          <Image src="/icons/arrow.svg" alt="" width={16} height={16} className="-rotate-90" />
        </button>
      )}

      {/* 다음 버튼: 마지막 장이 아닐 때만 */}
      {current < images.length - 1 && (
        <button
          type="button"
          aria-label="다음 사진"
          onClick={() => goTo(current + 1)}
          className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer rounded-full bg-white/80 p-1"
        >
          <Image src="/icons/arrow.svg" alt="" width={16} height={16} className="rotate-90" />
        </button>
      )}

      {/* 점 표시: 2장 이상일 때만 */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1">
          {images.map((src, index) => (
            <span
              key={src}
              className={`size-1.5 rounded-full ${index === current ? "bg-white" : "bg-white/50"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}