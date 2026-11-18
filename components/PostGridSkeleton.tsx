export default function PostGridSkeleton() {
  return (
    <div className="mt-[1px] grid animate-pulse grid-cols-3 gap-[1px]" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <div key={i} className="aspect-[3/4] bg-neutral-200 dark:bg-neutral-800" />
      ))}
    </div>
  );
}