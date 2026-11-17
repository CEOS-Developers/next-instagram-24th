export default function FeedPostSkeleton() {
  return (
    <div aria-hidden="true" className="border-b border-neutral-200 pb-6">
      <div className="motion-safe:animate-pulse">
        <div className="mb-3 flex items-center gap-3 px-3 sm:px-0">
          <div className="size-8 rounded-full bg-neutral-200" />
          <div className="h-3 w-24 rounded bg-neutral-200" />
          <div className="ml-auto h-1.5 w-5 rounded-full bg-neutral-200" />
        </div>

        <div className="aspect-[4/5] rounded-sm bg-neutral-200" />

        <div className="px-3 sm:px-0">
          <div className="mt-3 flex h-8 items-center gap-2">
            <div className="mx-1 size-6 rounded bg-neutral-200" />
            <div className="mx-1 size-6 rounded bg-neutral-200" />
            <div className="mx-1 size-6 rounded bg-neutral-200" />
            <div className="mr-1 ml-auto size-6 rounded bg-neutral-200" />
          </div>
          <div className="mt-2 flex h-5 items-center">
            <div className="h-3 w-20 rounded bg-neutral-200" />
          </div>
          <div className="mt-2 flex h-5 items-center">
            <div className="h-3 w-2/3 rounded bg-neutral-200" />
          </div>
          <div className="mt-1 flex h-4 items-center">
            <div className="h-2.5 w-12 rounded bg-neutral-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
