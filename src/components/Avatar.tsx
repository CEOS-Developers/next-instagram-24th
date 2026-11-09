import { UserRound } from "lucide-react";

export default function Avatar({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-neutral-200 bg-neutral-100 text-gray-500/85 ${className}`}
    >
      <UserRound
        fill="currentColor"
        stroke="none"
        className="size-[110%] max-w-none shrink-0 translate-y-[9%]"
      />
    </span>
  );
}
