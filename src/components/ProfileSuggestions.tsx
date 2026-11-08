import Link from "next/link";
import { UserRound } from "lucide-react";
import type { Profile } from "@/data/profiles";

export default function ProfileSuggestions({ profiles }: { profiles: Profile[] }) {
  if (profiles.length === 0) return null;

  return (
    <section aria-labelledby="suggested-profiles-heading">
      <h2 id="suggested-profiles-heading" className="mb-4 text-sm font-semibold text-gray-500">
        회원님을 위한 추천
      </h2>
      <ul className="space-y-4">
        {profiles.map((profile) => (
          <li key={profile.username} className="flex min-w-0 items-center gap-3">
            <Link href={`/${profile.username}`} aria-label={`${profile.username} 프로필 보기`} className="flex min-w-0 flex-1 items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2">
              <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-full border border-gray-200 bg-gray-100 text-gray-400">
                <UserRound size={26} strokeWidth={1.5} />
              </span>
              <span className="min-w-0 text-sm">
                <span className="block truncate font-semibold hover:underline">{profile.username}</span>
                {profile.displayName && <span className="mt-0.5 block truncate text-xs text-gray-500">{profile.displayName}</span>}
              </span>
            </Link>
            <button type="button" disabled aria-label={`${profile.username} 팔로우`} className="min-h-9 shrink-0 cursor-not-allowed px-1 text-xs font-semibold text-[#4a5df9]">
              팔로우
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
