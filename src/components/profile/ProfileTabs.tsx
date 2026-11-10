"use client";

import { useState, type ReactNode } from "react";
import { BookmarkIcon, GridIcon } from "@/components/icons";

function TaggedIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="size-6" aria-hidden="true"><path d="M9 4l2-2h2l2 2h4a2 2 0 012 2v13a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"/><circle cx="12" cy="10" r="3"/><path d="M5 20c2-6 12-6 14 0"/></svg>;
}

export default function ProfileTabs({ isMe, children }: { isMe: boolean; children: ReactNode }) {
  const [active, setActive] = useState("게시물");
  const tabs = [
    { label: "게시물", icon: <GridIcon className="size-6" /> },
    ...(isMe ? [{ label: "저장됨", icon: <BookmarkIcon className="size-6" /> }] : []),
    { label: "리포스트", icon: <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2"><path d="m2 9 4-4 4 4M6 5v10a3 3 0 003 3h4m9-3-4 4-4-4m4 4V9a3 3 0 00-3-3h-4"/></svg> },
    { label: "태그됨", icon: <TaggedIcon /> },
  ];
  return (
    <section id="profile-posts">
      <div role="group" aria-label="프로필 게시물 분류" className="mx-auto flex max-w-[740px] justify-around border-b border-neutral-200">
        {tabs.map(({ label, icon }) => (
          <button key={label} type="button" aria-label={label} title={label} aria-pressed={active === label}
            onClick={() => setActive(label)}
            className={`flex h-[72px] w-20 [&>svg]:size-8 items-center justify-center border-b-2 ${active === label ? "border-neutral-950 text-neutral-950" : "border-transparent text-neutral-500 hover:text-neutral-900"}`}>
            {icon}
          </button>
        ))}
      </div>
      {active === "게시물" ? children : (
        <div className="flex flex-col items-center gap-4 px-4 py-16 text-center">
          <span className="grid size-16 place-items-center rounded-full border border-current">{tabs.find(t => t.label === active)?.icon}</span>
          <h2 className="text-xl font-bold">{active === "저장됨" ? "저장된 게시물이 없습니다" : active === "리포스트" ? "리포스트한 게시물이 없습니다" : "태그된 게시물이 없습니다"}</h2>
        </div>
      )}
    </section>
  );
}
