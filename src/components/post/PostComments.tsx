"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";
import Link from "next/link";
import UserLink from "@/components/UserLink";
import type { CommentWithAuthor } from "@/types";

type Entry = { id: string; text: string; username: string };
const key = (id: string) => "instagram:comments:" + id;

function read(id: string) {
  try { return localStorage.getItem(key(id)) ?? "[]"; }
  catch { return "[]"; }
}
function parse(raw: string): Entry[] {
  try {
    const rows = JSON.parse(raw);
    return Array.isArray(rows) ? rows.filter(row => row && typeof row.id === "string" && typeof row.text === "string" && typeof row.username === "string") : [];
  } catch { return []; }
}
function subscribe(update: () => void) {
  window.addEventListener("storage", update);
  window.addEventListener("post-comment", update);
  return () => {
    window.removeEventListener("storage", update);
    window.removeEventListener("post-comment", update);
  };
}
function useComments(id: string) {
  return parse(useSyncExternalStore(subscribe, () => read(id), () => "[]"));
}

export function CommentCount({ id, base, link = false }: { id: string; base: number; link?: boolean }) {
  const count = base + useComments(id).length;
  if (!link) return <>{count}</>;
  return count > 0 ? <Link href={`/p/${id}`} className="block pt-1 text-sm text-neutral-500">댓글 {count}개 모두 보기</Link> : null;
}

export default function PostComments({ id, initial, username }: { id: string; initial: CommentWithAuthor[]; username: string }) {
  const added = useComments(id);
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    try {
      const entry = { id: crypto.randomUUID(), text, username };
      localStorage.setItem(key(id), JSON.stringify([...parse(read(id)), entry]));
      window.dispatchEvent(new Event("post-comment"));
      setDraft("");
      setStatus("댓글을 게시했어요.");
    } catch { setStatus("댓글을 저장하지 못했어요. 다시 시도해 주세요."); }
  }
  const comments = [...initial.map(c => ({ id: c.id, username: c.author.username, text: c.text })), ...added];
  return (
    <section className="border-t border-neutral-200 p-4 text-sm">
      <h2 className="mb-3 font-semibold">댓글 {comments.length}개</h2>
      {comments.length ? <ul className="space-y-3">{comments.map(c =>
        <li key={c.id} className="break-words"><UserLink user={c} /> {c.text}</li>
      )}</ul> : <p className="text-neutral-500">아직 댓글이 없습니다.</p>}
      <form onSubmit={submit} className="mt-4 flex gap-2 border-t border-neutral-200 pt-3">
        <input aria-label="댓글 입력" placeholder="댓글 달기…" maxLength={1000} value={draft}
          onChange={e => { setDraft(e.target.value); setStatus(""); }} className="min-w-0 flex-1 rounded px-1 py-2" />
        <button type="submit" disabled={!draft.trim()} className="px-2 font-semibold text-sky-600 disabled:opacity-40">게시</button>
      </form>
      <p role="status" className="text-xs text-neutral-500">{status}</p>
    </section>
  );
}
