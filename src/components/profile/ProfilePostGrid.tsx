import { GridIcon } from "@/components/icons";
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
export default function ProfilePostGrid({ posts }: { posts: Post[] }) {
  return (
    <section className="border-t border-neutral-200">
      {/* 탭 (지금은 게시물 탭 하나, 저장됨 탭은 선택 요건에서 추가) */}
      <div className="flex justify-center">
        <span className="-mt-px flex items-center gap-1.5 border-t border-neutral-900 py-3 text-xs font-semibold tracking-widest">
          <GridIcon className="size-3" />
          게시물
        </span>
      </div>

      {posts.length === 0 ? (
        <p className="py-16 text-center text-neutral-500">아직 게시물이 없습니다</p>
      ) : (
        <ul className="grid grid-cols-3 gap-0.5 md:gap-1">
          {posts.map((post) => (
            <li key={post.id}>
              <PostGridItem post={post} commentCount={getCommentCount(post.id)} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
