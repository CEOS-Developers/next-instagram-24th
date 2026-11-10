"use client";

import { useRef } from "react";
import Link from "next/link";
import FollowButton, { useFollowing } from "@/components/FollowButton";
import ProfileEditor, { useProfileFields } from "./ProfileEditor";
import ProfileNote from "./ProfileNote";
import Avatar from "@/components/Avatar";
import { formatCount } from "@/lib/format";
import type { User } from "@/types";

type ProfileHeaderProps = {
  user: User;
  suggestions?: Pick<User, "username">[];
  postCount: number;
  isMe: boolean; // 내 프로필이면 "프로필 편집", 아니면 "팔로우" 버튼
};

// 프로필 상단: 사진, 아이디, 버튼, 게시물/팔로워/팔로잉 수, 이름, 소개
export default function ProfileHeader({ user, postCount, isMe, suggestions = [] }: ProfileHeaderProps) {
  const archive = useRef<HTMLDialogElement>(null);
  const fields = useProfileFields(user, isMe);
  // 팔로우하면 이 사람의 팔로워 수 +1 (버튼과 같은 상태를 보므로 누르는 즉시 반영)
  const { following } = useFollowing(user.id);
  const stats = [
    { label: "게시물", value: postCount },
    { label: "팔로워", value: user.followerCount + (!isMe && following ? 1 : 0) },
    { label: "팔로잉", value: user.followingCount },
  ];

  const button = isMe ? (
    <div className="grid grid-cols-2 gap-2">
      <ProfileEditor id={user.id} fields={fields} />
      <button type="button" className="rounded-lg bg-neutral-100 text-sm font-semibold hover:bg-neutral-200" onClick={() => archive.current?.showModal()}>보관함 보기</button>
      <dialog ref={archive} aria-label="보관함" className="fixed inset-0 m-auto rounded-xl p-6 backdrop:bg-black/40">
        <p>보관한 게시물이 없어요.</p>
        <form method="dialog" className="mt-4 text-right"><button>닫기</button></form>
      </dialog>
    </div>
  ) : (
    // [팔로우] [메시지 보내기] [추천 계정] 한 줄 (메시지 보내기는 화면만 있는 버튼)
    <div className="relative flex items-stretch gap-2">
      <FollowButton userId={user.id} wide />
      <button type="button" className="flex-[1.12] rounded-xl bg-neutral-100 py-2.5 font-semibold hover:bg-neutral-200">
        메시지 보내기
      </button>
      <details>
        <summary aria-label="추천 계정 보기" title="추천 계정 보기" className="grid h-full w-12 cursor-pointer list-none place-items-center rounded-xl bg-neutral-100 hover:bg-neutral-200 md:w-[52px]">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="8" r="3"/><path d="M2 20v-2a6 6 0 0112 0v2m4-15v8m-4-4h8"/></svg>
        </summary>
        <div className="absolute right-0 z-10 mt-2 grid gap-2 rounded-xl border border-neutral-200 bg-white p-4 text-sm shadow">
          <strong>추천 계정</strong>
          {suggestions.map(u => <Link key={u.username} href={`/${u.username}`}>{u.username}</Link>)}
        </div>
      </details>
    </div>
  );

  return (
    <header data-visitor={isMe ? undefined : "true"} className="mx-auto w-full max-w-[740px] px-4 pt-8 pb-10 md:px-0 md:pt-16 md:pb-16">
      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-5 gap-y-4 md:gap-x-12 md:px-5">
        <div className="relative w-fit md:row-span-2">
          {isMe && <ProfileNote userId={user.id} />}
          <div className="md:hidden"><Avatar user={user} size={77} eager /></div>
          <div className="hidden md:block"><Avatar user={user} size={150} eager /></div>
        </div>
        <div className="min-w-0 md:self-end">
          <h1 className="break-words text-2xl font-bold tracking-tight md:text-3xl">{user.username}{!isMe && <a href="#profile-posts" aria-label="게시물로 이동" className="ml-4 align-middle text-lg">···</a>}</h1>
          <p className="mt-1 text-sm md:text-base">{fields.name}</p>
        </div>
        <div className="col-span-2 min-w-0 space-y-3 text-sm md:col-span-1 md:self-start">
          <ul className="flex flex-wrap gap-x-5 gap-y-1 md:text-base">
            {stats.map(({ label, value }) => (
              <li key={label}>{label} <strong>{formatCount(value)}</strong></li>
            ))}
          </ul>
          <div className="break-words">
            {fields.bio && <p className="whitespace-pre-line">
              {fields.bio.split(/(https?:\/\/[^\s<>]+)/gi).map((part, index) =>
                /^https?:\/\//i.test(part)
                  ? <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="font-semibold text-sky-900 hover:underline">{part}</a>
                  : part
              )}
            </p>}
          </div>
        </div>
      </div>
      <div className="mt-6 md:mt-10">{button}</div>
    </header>
  );
}
