// 프로필 정보를 불러오는 동안 보여줄 회색 자리표시 (ProfileHeader 와 같은 배치)
export default function ProfileHeaderSkeleton() {
  return (
    <div
      aria-hidden
      className="flex animate-pulse flex-col gap-4 px-4 pt-6 pb-8 md:flex-row md:gap-24 md:px-0 md:pt-8 md:pb-11"
    >
      <div className="flex items-center gap-6 md:block md:w-[150px] md:shrink-0 md:pl-12 md:box-content">
        <div className="size-[77px] rounded-full bg-neutral-200 md:size-[150px]" />
        <div className="flex flex-col gap-3 md:hidden">
          <div className="h-5 w-28 rounded bg-neutral-200" />
          <div className="h-8 w-24 rounded-lg bg-neutral-200" />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="hidden h-8 w-56 rounded bg-neutral-200 md:block" />
        <div className="h-5 w-full rounded bg-neutral-200 md:w-72" />
        <div className="flex flex-col gap-2">
          <div className="h-4 w-24 rounded bg-neutral-200" />
          <div className="h-4 w-48 rounded bg-neutral-200" />
        </div>
      </div>
    </div>
  );
}
