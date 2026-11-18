// 게시물을 불러오는 동안 보여 주는 회색 카드 (PostCard와 같은 배치)
export default function PostCardSkeleton() {
  return (
    <div className="animate-pulse pb-4" aria-hidden="true">
  
      <div className="flex h-14 items-center gap-3.5 pl-3">
        <div className="size-8 rounded-full bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-3 w-24 rounded bg-neutral-200 dark:bg-neutral-800" />
      </div>

      <div className="aspect-[3/4] w-full bg-neutral-200 dark:bg-neutral-800" />

      <div className="px-4 pt-1.5">

        <div className="mt-1 h-10" />

        <div className="space-y-2">
          <div className="h-3 w-3/4 rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-3 w-1/3 rounded bg-neutral-200 dark:bg-neutral-800" />
        </div>
      </div>
    </div>
  );
}