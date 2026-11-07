import Link from "next/link";
import { UserRound } from "lucide-react";
import type { Profile } from "@/data/profiles";

export default function ProfileSuggestions({ profiles }: { profiles: Profile[] }) {
  if (profiles.length === 0) return null;

  return (
    <section aria-labelledby="suggested-profiles-heading" className="mx-4 mt-8 md:mx-auto md:max-w-3xl">
      <h2 id="suggested-profiles-heading" className="mb-3 text-sm font-semibold text-gray-500">
        추천 계정
      </h2>
      <ul className="grid grid-cols-2 gap-3">
        {profiles.map((profile) => (
          <li key={profile.username} className="min-w-0">
            <Link
              href={`/${profile.username}`}
              aria-label={`${profile.username} 프로필 보기`}
              className="flex h-full min-w-0 flex-col items-center rounded-xl border border-gray-200 px-3 py-4 text-center hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <span aria-hidden="true" className="mb-3 grid size-14 shrink-0 place-items-center rounded-full border border-gray-200 bg-gray-100 text-gray-400">
                <UserRound size={36} strokeWidth={1.2} />
              </span>
              <span className="w-full truncate text-sm font-semibold">{profile.username}</span>
              {profile.displayName && (
                <span className="mt-1 w-full truncate text-xs text-gray-500">{profile.displayName}</span>
              )}
              <span className="mt-3 text-xs font-semibold text-[#4a5df9]">프로필 보기</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
