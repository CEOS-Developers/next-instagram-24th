import { Plus } from "lucide-react";
import type { Highlight } from "@/data/highlights";

type ProfileHighlightsProps = {
  highlights: Highlight[];
  isOwnProfile: boolean;
};

export default function ProfileHighlights({
  highlights,
  isOwnProfile,
}: ProfileHighlightsProps) {
  if (highlights.length === 0 && !isOwnProfile) {
    return null;
  }

  return (
    <section
      aria-label="스토리 하이라이트"
      tabIndex={0}
      className="mx-4 mt-8 max-w-3xl overflow-x-auto [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-12 md:mx-auto [&::-webkit-scrollbar]:hidden"
    >
      <ul className="flex gap-4 px-1 py-1 sm:gap-6">
        {highlights.map((highlight) => (
          <li key={highlight.id} className="w-20 shrink-0 sm:w-24">
            <button
              type="button"
              disabled
              title={highlight.label}
              className="flex w-full cursor-not-allowed flex-col items-center gap-2"
            >
              <span
                aria-hidden="true"
                className="block size-20 rounded-full border-[3px] border-gray-200 p-1 sm:size-24"
              >
                <span className="block size-full rounded-full bg-gray-100" />
              </span>
              <span className="w-full truncate text-center text-xs sm:text-sm">
                {highlight.label}
              </span>
            </button>
          </li>
        ))}
        {isOwnProfile && (
          <li className="w-20 shrink-0 sm:w-24">
            <button
              type="button"
              disabled
              aria-label="하이라이트 추가"
              title="하이라이트 추가"
              className="flex w-full cursor-not-allowed flex-col items-center gap-2"
            >
              <span
                aria-hidden="true"
                className="block size-20 rounded-full border-[3px] border-gray-200 p-1 sm:size-24"
              >
                <span className="grid size-full place-items-center rounded-full bg-gray-100 text-gray-400">
                  <Plus size={40} strokeWidth={1.5} />
                </span>
              </span>
              <span className="text-xs sm:text-sm">New</span>
            </button>
          </li>
        )}
      </ul>
    </section>
  );
}
