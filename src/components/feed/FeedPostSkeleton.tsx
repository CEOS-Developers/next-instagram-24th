/** 피드 게시물 카드와 같은 크기의 로딩 자리입니다. */
export default function FeedPostSkeleton() {
  return (
    <div aria-hidden="true" className="animate-pulse border-b border-border pb-5">
      <div className="flex h-[54px] items-center gap-3">
        <div className="size-8 rounded-avatar bg-surface-muted" />
        <div className="h-3.5 w-32 rounded-sm bg-surface-muted" />
      </div>

      <div className="aspect-square rounded-sm bg-surface-muted" />

      <div className="mt-3 flex gap-4">
        <div className="size-6 rounded-sm bg-surface-muted" />
        <div className="size-6 rounded-sm bg-surface-muted" />
        <div className="size-6 rounded-sm bg-surface-muted" />
        <div className="ml-auto size-6 rounded-sm bg-surface-muted" />
      </div>

      <div className="mt-3 h-3.5 w-24 rounded-sm bg-surface-muted" />
      <div className="mt-2 h-3.5 w-3/4 rounded-sm bg-surface-muted" />
    </div>
  );
}
