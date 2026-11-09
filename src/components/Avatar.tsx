import { FaUser } from "react-icons/fa6";

export default function Avatar({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`relative block shrink-0 overflow-hidden rounded-full border border-neutral-200 bg-neutral-100 text-gray-500/85 ${className}`}
    >
      <FaUser className="absolute bottom-0 left-1/2 h-[81.25%] w-[81.25%] -translate-x-1/2" />
    </span>
  );
}