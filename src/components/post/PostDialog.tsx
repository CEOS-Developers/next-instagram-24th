"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

type PostDialogProps = {
  children: ReactNode;
  previousId?: string;
  nextId?: string;
};

const navigationClassName =
  "absolute top-1/2 z-20 hidden size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-sm hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:flex";

export default function PostDialog({ children, previousId, nextId }: PostDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-label="게시물 상세"
      onCancel={(event) => {
        event.preventDefault();
        router.back();
      }}
      className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-hidden bg-transparent p-0 text-foreground backdrop:bg-black/65"
    >
      <button
        type="button"
        aria-label="게시물 닫기"
        onClick={() => router.back()}
        className="absolute top-2 right-2 z-20 grid size-10 place-items-center rounded-full text-white hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-white"
      >
        <X aria-hidden="true" className="size-6" />
      </button>

      <button
        type="button"
        tabIndex={-1}
        aria-label="게시물 바깥 영역 닫기"
        onClick={() => router.back()}
        className="absolute inset-0"
      />

      {previousId && (
        <Link href={`/posts/${previousId}`} replace scroll={false} aria-label="이전 게시물" className={`${navigationClassName} left-2`}>
          <ChevronLeft aria-hidden="true" className="size-6" />
        </Link>
      )}

      <div className="pointer-events-none relative z-10 grid h-full grid-rows-[minmax(0,1fr)] place-items-center px-4 pt-12 pb-4 sm:px-14 sm:py-6">
        <div className="pointer-events-auto max-h-full w-full max-w-xl overflow-y-auto rounded-xl [scrollbar-width:none] sm:overflow-hidden sm:max-w-[min(75rem,calc((100dvh_-_3rem)*1.44))]">
          {children}
        </div>
      </div>

      {nextId && (
        <Link href={`/posts/${nextId}`} replace scroll={false} aria-label="다음 게시물" className={`${navigationClassName} right-2`}>
          <ChevronRight aria-hidden="true" className="size-6" />
        </Link>
      )}
    </dialog>
  );
}
