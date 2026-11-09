"use client";

import { useRef, useState, useSyncExternalStore } from "react";

function subscribe(refresh: () => void) {
  window.addEventListener("storage", refresh);
  window.addEventListener("profile-note", refresh);
  return () => {
    window.removeEventListener("storage", refresh);
    window.removeEventListener("profile-note", refresh);
  };
}

export default function ProfileNote({ userId }: { userId: string }) {
  const key = "instagram:profile-note:" + userId;
  const note = useSyncExternalStore(subscribe, () => {
    try { return localStorage.getItem(key) ?? ""; } catch { return ""; }
  }, () => "");
  const dialog = useRef<HTMLDialogElement>(null);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");

  function save(value: string) {
    try {
      if (value) localStorage.setItem(key, value);
      else localStorage.removeItem(key);
      window.dispatchEvent(new Event("profile-note"));
      dialog.current?.close();
    } catch {
      setError("저장하지 못했어요. 브라우저 저장소 설정을 확인해 주세요.");
    }
  }

  return (
    <>
      <button type="button" aria-haspopup="dialog" aria-label={note ? "노트 수정: " + note : "노트 작성"}
        onClick={() => { setDraft(note); setError(""); dialog.current?.showModal(); }}
        className="absolute bottom-[88%] left-1/2 z-10 max-w-full -translate-x-1/2 rounded-2xl bg-white px-4 py-2.5 text-sm text-neutral-600 shadow-[0_3px_20px_#0002] after:absolute after:-bottom-1 after:left-1/3 after:size-2 after:rounded-full after:bg-white md:px-5 md:py-3">
        <span className="block truncate">{note || "노트…"}</span>
      </button>
      <dialog ref={dialog} aria-labelledby="profile-note-title" className="fixed inset-0 m-auto w-[min(90vw,360px)] rounded-2xl bg-white p-6 shadow-xl backdrop:bg-black/40">
        <form onSubmit={event => { event.preventDefault(); if (draft.trim()) save(draft.trim()); }}>
          <h2 id="profile-note-title" className="mb-4 text-lg font-bold">내 노트</h2>
          <label htmlFor="profile-note-text" className="sr-only">노트 내용</label>
          <textarea id="profile-note-text" value={draft} onChange={event => setDraft(event.target.value)}
            maxLength={60} rows={3} placeholder="지금 무슨 생각을 하고 있나요?"
            className="w-full resize-none rounded-lg bg-neutral-100 p-3 text-sm" />
          <p className="text-right text-xs text-neutral-500">{draft.length}/60</p>
          {error && <p role="alert" className="mt-2 text-sm text-red-600">{error}</p>}
          <div className="mt-5 flex items-center gap-3 text-sm font-semibold">
            {note && <button type="button" className="text-red-600" onClick={() => save("")}>삭제</button>}
            <button type="button" className="ml-auto p-2" onClick={() => dialog.current?.close()}>취소</button>
            <button disabled={!draft.trim()} className="rounded-lg bg-sky-600 px-4 py-2 text-white disabled:opacity-40">저장</button>
          </div>
        </form>
      </dialog>
    </>
  );
}
