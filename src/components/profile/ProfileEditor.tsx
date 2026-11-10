"use client";

import { useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import type { User } from "@/types";

type Fields = { name: string; bio: string };

function subscribe(update: () => void) {
  window.addEventListener("storage", update);
  window.addEventListener("profile-saved", update);
  return () => {
    window.removeEventListener("storage", update);
    window.removeEventListener("profile-saved", update);
  };
}

function combinedBio(bio: string, website?: unknown) {
  const url = typeof website === "string" ? website.trim() : "";
  return url && !bio.split(/\s+/).includes(url) ? [bio, url].filter(Boolean).join("\n") : bio;
}

export function useProfileFields(user: User, editable: boolean): Fields {
  const raw = useSyncExternalStore(subscribe, () => {
    try { return editable ? localStorage.getItem("instagram:profile:" + user.id) : null; }
    catch { return null; }
  }, () => null);
  if (raw) {
    try {
      const f = JSON.parse(raw);
      if (typeof f?.name === "string" && f.name.trim() && typeof f.bio === "string") return { name: f.name, bio: combinedBio(f.bio, f.website) };
    } catch { /* 저장된 형식이 다르면 기본 프로필을 사용한다. */ }
  }
  return { name: user.name, bio: combinedBio(user.bio, user.website) };
}

export default function ProfileEditor({ id, fields }: { id: string; fields: Fields }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [draft, setDraft] = useState(fields);
  const [error, setError] = useState("");
  function save(event: FormEvent) {
    event.preventDefault();
    const next = { name: draft.name.trim(), bio: draft.bio.trim() };
    if (!next.name) return;
    try {
      localStorage.setItem("instagram:profile:" + id, JSON.stringify(next));
      window.dispatchEvent(new Event("profile-saved"));
      dialog.current?.close();
    } catch { setError("저장하지 못했어요. 브라우저 저장소 설정을 확인해 주세요."); }
  }
  const fieldClass = "mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 font-normal";
  return (
    <>
      <button type="button" aria-haspopup="dialog" className="w-full rounded-lg bg-neutral-100 px-4 py-2.5 text-sm font-semibold hover:bg-neutral-200"
        onClick={() => { setDraft(fields); setError(""); dialog.current?.showModal(); }}>프로필 편집</button>
      <dialog ref={dialog} aria-labelledby="profile-edit-title" className="fixed inset-0 m-auto w-[min(90vw,420px)] rounded-2xl p-6 backdrop:bg-black/40">
        <form onSubmit={save} className="grid gap-4 text-sm">
          <h2 id="profile-edit-title" className="text-xl font-bold">프로필 편집</h2>
          <label>이름<input required maxLength={50} className={fieldClass} value={draft.name} onChange={e => setDraft({ ...draft, name: e.target.value })} /></label>
          <label>소개<textarea rows={4} placeholder="소개와 웹사이트 주소를 입력하세요" className={fieldClass} value={draft.bio} onChange={e => setDraft({ ...draft, bio: e.target.value })} /></label>
          {error && <p role="alert" className="text-red-600">{error}</p>}
          <div className="flex justify-end gap-4 font-semibold">
            <button type="button" onClick={() => dialog.current?.close()}>취소</button>
            <button disabled={!draft.name.trim()} className="rounded-lg bg-sky-600 px-4 py-2 text-white disabled:opacity-40">저장</button>
          </div>
        </form>
      </dialog>
    </>
  );
}
