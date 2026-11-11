"use client";

import { useEffect, useRef, type MouseEvent, type ReactNode, type SyntheticEvent } from "react";
import { useRouter } from "next/navigation";

export type PostModalProps = {
  children: ReactNode;
};

export default function PostModal({ children }: PostModalProps) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();

    // 모달이 열려 있는 동안 뒤쪽 페이지가 스크롤되지 않게 막습니다.
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    return () => {
      root.style.overflow = previousOverflow;
      // Next.js는 지난 화면을 숨긴 채 보존할 수 있어서, 숨겨질 때 dialog를 직접 닫아야
      // 보이지 않는 모달이 뒤쪽 화면의 클릭을 막지 않습니다.
      dialog?.close();
    };
  }, []);

  function close() {
    router.back();
  }

  // ESC 키: 브라우저가 dialog를 직접 닫지 않게 하고, 뒤로 가기로 닫습니다.
  function handleCancel(event: SyntheticEvent<HTMLDialogElement>) {
    event.preventDefault();
    close();
  }

  // 게시물 바깥(어두운 배경)을 누르면 닫습니다.
  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) close();
  }

  return (
    <dialog
      ref={dialogRef}
      aria-label="게시물 상세"
      onCancel={handleCancel}
      onClick={handleBackdropClick}
      className="m-0 h-dvh max-h-none w-dvw max-w-none items-center justify-center bg-transparent p-0 backdrop:bg-black/65 open:flex"
    >
      <button
        type="button"
        aria-label="닫기"
        onClick={close}
        className="fixed top-4 right-4 inline-flex size-10 cursor-pointer items-center justify-center text-white focus-visible:outline-2 focus-visible:outline-white"
      >
        <svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M5 5l14 14M19 5 5 19" />
        </svg>
      </button>

      {children}
    </dialog>
  );
}
