"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type PostModalProps = {
  children: ReactNode;
  previousId?: string;
  nextId?: string;
};

const navigationClassName =
  "fixed top-1/2 hidden size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-sm hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:flex";

export default function PostModal({ children, previousId, nextId }: PostModalProps) {
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
      onClick={(event) => {
        if (event.target === event.currentTarget) router.back();
      }}
      className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none items-start justify-center overflow-y-auto border-0 bg-transparent px-3 pt-14 pb-6 text-black backdrop:bg-black/65 open:flex sm:items-center sm:px-14 sm:py-12"
    >
      <button
        type="button"
        aria-label="게시물 닫기"
        onClick={() => router.back()}
        className="fixed top-2 right-2 z-10 grid size-10 place-items-center rounded-full text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white sm:top-3 sm:right-3"
      >
        <X size={30} strokeWidth={1.8} aria-hidden="true" />
      </button>
      {previousId && (
        <Link href={`/posts/${previousId}`} replace scroll={false} aria-label="이전 게시물" className={`${navigationClassName} left-2`}>
          <ChevronLeft size={24} aria-hidden="true" />
        </Link>
      )}
      <div className="w-full max-w-[1200px] shrink-0">{children}</div>
      {nextId && (
        <Link href={`/posts/${nextId}`} replace scroll={false} aria-label="다음 게시물" className={`${navigationClassName} right-2`}>
          <ChevronRight size={24} aria-hidden="true" />
        </Link>
      )}
    </dialog>
  );
}
