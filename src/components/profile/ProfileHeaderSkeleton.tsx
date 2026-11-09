export default function ProfileHeaderSkeleton() {
  return (
    <div aria-hidden className="motion-safe:animate-pulse px-4 pt-8 pb-10 md:px-0 md:pt-16 md:pb-16">
      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-5 gap-y-4 md:gap-x-12 md:px-5">
        <div className="size-[77px] rounded-full bg-neutral-200 md:row-span-2 md:size-[150px]" />
        <div className="space-y-2 md:self-end">
          <div className="h-7 w-32 max-w-full rounded bg-neutral-200" />
          <div className="h-4 w-20 rounded bg-neutral-200" />
        </div>
        <div className="col-span-2 space-y-3 md:col-span-1 md:self-start">
          <div className="h-5 w-60 max-w-full rounded bg-neutral-200" />
          <div className="h-12 w-44 rounded bg-neutral-100" />
        </div>
      </div>
      <div className="mt-6 h-10 rounded-lg bg-neutral-100 md:mt-10" />
    </div>
  );
}
