"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useState, type FormEvent } from "react";
import Avatar from "@/components/Avatar";
import type { Profile } from "@/data/profiles";
import { MAX_BIO_LENGTH, useProfileBio } from "@/hooks/useProfileBio";

export default function ProfileEditForm({ profile }: { profile: Profile }) {
  const { bio, saveBio } = useProfileBio(profile.bio);
  const [draft, setDraft] = useState<string | null>(null);
  const [error, setError] = useState("");
  const id = useId();
  const router = useRouter();
  const profileHref = `/${profile.username}`;
  const value = draft ?? bio;
  const hasChanges = value !== bio;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!hasChanges) return;

    if (!saveBio(value)) {
      setError("소개글을 저장하지 못했어요. 브라우저의 저장 설정을 확인하고 다시 시도해주세요.");
      return;
    }

    setDraft(null);
    router.push(profileHref);
  }

  function discardDraft() {
    setDraft(null);
    setError("");
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 pt-8 pb-12 sm:px-8 sm:pt-12 lg:px-10">
      <div className="mb-10 flex items-center gap-3 sm:mb-12">
        <Link
          href={profileHref}
          onClick={discardDraft}
          aria-label="프로필로 돌아가기"
          className="grid size-9 shrink-0 place-items-center rounded-full hover:bg-neutral-100 focus-visible:outline-2 dark:hover:bg-neutral-800"
        >
          <ChevronLeft aria-hidden="true" className="size-6" />
        </Link>
        <h1 className="text-xl font-bold sm:text-2xl">프로필 편집</h1>
      </div>

      <div className="mb-8 flex items-center gap-4 rounded-3xl bg-neutral-100 p-5 sm:p-6 dark:bg-neutral-900">
        <Avatar className="size-16 shrink-0 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400" />
        <div className="min-w-0">
          <p className="truncate text-lg font-bold">{profile.username}</p>
          {profile.displayName && <p className="mt-0.5 text-sm text-neutral-500 dark:text-neutral-400">{profile.displayName}</p>}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <div className="relative rounded-2xl border border-neutral-300 px-4 pt-3 pb-8 focus-within:border-neutral-500 dark:border-neutral-700 dark:focus-within:border-neutral-400">
            <label htmlFor={`${id}-bio`} className="block text-sm text-neutral-500 dark:text-neutral-400">소개</label>
            <textarea
              id={`${id}-bio`}
              value={value}
              onChange={(event) => {
                setDraft(event.target.value);
                setError("");
              }}
              maxLength={MAX_BIO_LENGTH}
              rows={4}
              aria-describedby={`${id}-count${error ? ` ${id}-error` : ""}`}
              placeholder="나를 소개하는 글을 남겨보세요."
              className="mt-2 block min-h-24 w-full resize-y bg-transparent text-base wrap-break-word placeholder:text-neutral-400 focus-visible:outline-none"
            />
            <p id={`${id}-count`} className="absolute right-4 bottom-3 text-xs text-neutral-500 dark:text-neutral-400">
              {value.length} / {MAX_BIO_LENGTH}
            </p>
          </div>
          {error && <p id={`${id}-error`} role="alert" className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</p>}
        </div>

        <p className="text-sm leading-6 text-neutral-500 dark:text-neutral-400">
          소개는 프로필을 방문하는 모든 사람에게 표시됩니다.
        </p>

        <div className="space-y-3">
          <button
            type="submit"
            disabled={!hasChanges || value.length > MAX_BIO_LENGTH}
            className="min-h-12 w-full cursor-pointer rounded-2xl bg-[#4a5df9] px-5 py-3 text-sm font-semibold text-white hover:bg-[#3f50df] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:cursor-default disabled:bg-[#b6caff]"
          >
            제출
          </button>
          <Link
            href={profileHref}
            onClick={discardDraft}
            className="block rounded-xl px-5 py-3 text-center text-sm font-semibold hover:bg-neutral-100 focus-visible:outline-2 dark:hover:bg-neutral-900"
          >
            취소
          </Link>
        </div>
      </form>
    </main>
  );
}
