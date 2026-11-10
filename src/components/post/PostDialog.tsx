"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useRouter } from "next/navigation";

export default function PostDialog({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  useEffect(() => {
    const dialog = ref.current!;
    dialog.showModal();
    return () => dialog.close();
  }, []);
  return (
    <dialog ref={ref} aria-label="게시물 상세" className="post-dialog"
      onCancel={event => { event.preventDefault(); router.back(); }}
      onClick={event => { if (event.target === event.currentTarget) router.back(); }}>
      <button type="button" aria-label="닫기" onClick={() => router.back()}
        className="fixed right-3 top-2 z-10 size-11 text-4xl text-white">×</button>
      {children}
    </dialog>
  );
}
