import ProfileTabs from "./ProfileTabs";
import PostGridItem from "@/components/post/PostGridItem";
import { getCommentCount } from "@/lib/data";
import type { Post } from "@/types";

// 로딩 중 회색 칸 6개
export function ProfilePostGridSkeleton() {
  return (
    <div aria-hidden className="grid animate-pulse grid-cols-3 gap-0.5 border-t border-neutral-200 pt-12 md:gap-1">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="aspect-square bg-neutral-200" />
      ))}
    </div>
  );
}

// 프로필 하단: "게시물" 탭 + 3열 그리드
export default function ProfilePostGrid({ posts, isMe }: { posts: Post[]; isMe: boolean }) {
  return (
    <ProfileTabs isMe={isMe}>
      {posts.length === 0 ? (
        <div className="flex flex-col items-center gap-4 px-4 py-16 text-center">
          <span className="grid size-16 place-items-center rounded-full border border-current">
            <svg aria-hidden="true" className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M3 7h4l2-3h6l2 3h4v13H3z"/><circle cx="12" cy="13" r="4"/></svg>
          </span>
          <h2 className="text-2xl font-bold">아직 게시물이 없습니다</h2>
          <p className="text-sm text-neutral-600">공유한 사진이 이곳에 표시됩니다.</p>
        </div>
      ) : (
        <ul className="grid grid-cols-3 gap-0.5 md:gap-1">
          {posts.map((post) => (
            <li key={post.id}>
              <PostGridItem post={post} commentCount={getCommentCount(post.id)} />
            </li>
          ))}
        </ul>
      )}
    </ProfileTabs>
  );
}
