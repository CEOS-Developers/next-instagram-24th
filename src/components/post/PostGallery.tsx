"use client";

import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import Image from "next/image";
import { useRef, useState, type PointerEvent } from "react";
import type { Post } from "@/data/posts";
import { likePost } from "@/hooks/usePostInteractions";

type PostGalleryProps = {
  postId: string;
  images: Post["images"];
  variant?: "detail" | "feed";
  eager?: boolean;
  onFirstImageSettled?: () => void;
};

type PhotoTap = {
  x: number;
  y: number;
  time: number;
  index: number;
  pointerType: string;
};

const tapDuration = 300;
const tapMovement = 12;
const doubleTapDistance = 24;

const arrowClassName =
  "absolute top-1/2 grid size-8 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/85 text-black transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";

export default function PostGallery({
  postId,
  images,
  variant = "detail",
  eager = true,
  onFirstImageSettled,
}: PostGalleryProps) {
  const [index, setIndex] = useState(0);
  const [heartAnimation, setHeartAnimation] = useState(0);
  const pointerDown = useRef<(PhotoTap & { pointerId: number }) | null>(null);
  const lastTap = useRef<PhotoTap | null>(null);
  const isFeed = variant === "feed";

  function resetTap() {
    pointerDown.current = null;
    lastTap.current = null;
  }

  function selectPhoto(photoIndex: number) {
    resetTap();
    setIndex(photoIndex);
  }

  function handlePhotoPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || event.button !== 0) {
      resetTap();
      return;
    }

    pointerDown.current = {
      x: event.clientX,
      y: event.clientY,
      time: event.timeStamp,
      index,
      pointerType: event.pointerType,
      pointerId: event.pointerId,
    };
  }

  function handlePhotoPointerUp(event: PointerEvent<HTMLDivElement>) {
    const start = pointerDown.current;
    pointerDown.current = null;

    const tap: PhotoTap = {
      x: event.clientX,
      y: event.clientY,
      time: event.timeStamp,
      index,
      pointerType: event.pointerType,
    };

    if (
      !start ||
      start.pointerId !== event.pointerId ||
      start.index !== tap.index ||
      tap.time - start.time > tapDuration ||
      Math.hypot(tap.x - start.x, tap.y - start.y) > tapMovement
    ) {
      lastTap.current = null;
      return;
    }

    const previous = lastTap.current;
    if (
      previous &&
      previous.index === tap.index &&
      previous.pointerType === tap.pointerType &&
      tap.time - previous.time <= tapDuration &&
      Math.hypot(tap.x - previous.x, tap.y - previous.y) <= doubleTapDistance
    ) {
      lastTap.current = null;
      likePost(postId);
      setHeartAnimation((animation) => animation + 1);
      return;
    }

    lastTap.current = tap;
  }

  return (
    <section
      aria-label="게시물 사진"
      className={
        isFeed
          ? "min-w-0"
          : "relative aspect-[4/5] overflow-hidden bg-neutral-100 sm:aspect-auto"
      }
    >
      <div
        className={
          isFeed
            ? "relative aspect-[4/5] overflow-hidden rounded-sm bg-neutral-100"
            : "contents"
        }
      >
        <div
          onPointerDown={handlePhotoPointerDown}
          onPointerUp={handlePhotoPointerUp}
          onPointerCancel={resetTap}
          onPointerLeave={() => {
            if (pointerDown.current) resetTap();
          }}
          className="absolute inset-0 flex touch-manipulation select-none transition-transform duration-300 ease-out motion-reduce:transition-none"
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
                draggable={false}
                onLoad={photoIndex === 0 ? onFirstImageSettled : undefined}
                onError={photoIndex === 0 ? onFirstImageSettled : undefined}
                loading={photoIndex === 0 && eager ? "eager" : "lazy"}
                sizes={
                  isFeed
                    ? "(max-width: 468px) 100vw, 468px"
                    : "(min-width: 1280px) 667px, (min-width: 640px) 56vw, 100vw"
                }
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {heartAnimation > 0 && (
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <Heart
              key={heartAnimation}
              aria-hidden="true"
              className="photo-like-heart size-20 fill-red-500 text-red-500 drop-shadow-md sm:size-24"
            />
          </div>
        )}

        {index > 0 && (
          <button
            type="button"
            aria-label="이전 사진"
            onClick={() => selectPhoto(Math.max(0, index - 1))}
            className={`${arrowClassName} left-3`}
          >
            <ChevronLeft aria-hidden="true" className="size-5" />
          </button>
        )}

        {index < images.length - 1 && (
          <button
            type="button"
            aria-label="다음 사진"
            onClick={() => selectPhoto(Math.min(images.length - 1, index + 1))}
            className={`${arrowClassName} right-3`}
          >
            <ChevronRight aria-hidden="true" className="size-5" />
          </button>
        )}
      </div>

      {images.length > 1 && (
        <>
          <p aria-live="polite" aria-atomic="true" className="sr-only">
            사진 {index + 1} / {images.length}
          </p>

          <div
            className={
              isFeed
                ? "flex justify-center pt-1"
                : "absolute bottom-2 left-1/2 flex -translate-x-1/2"
            }
          >
            {images.map((photo, photoIndex) => (
              <button
                key={`${photo.src}-${photoIndex}`}
                type="button"
                aria-label={`${photoIndex + 1}번째 사진 보기`}
                aria-current={photoIndex === index ? "true" : undefined}
                onClick={() => selectPhoto(photoIndex)}
                className={`grid h-5 cursor-pointer place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  isFeed ? "w-2.5" : "w-5"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`size-1.5 rounded-full ${
                    isFeed
                      ? photoIndex === index
                        ? "bg-[#4f46ff]"
                        : "bg-neutral-300"
                      : photoIndex === index
                        ? "bg-white"
                        : "bg-white/50"
                  }`}
                />
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
