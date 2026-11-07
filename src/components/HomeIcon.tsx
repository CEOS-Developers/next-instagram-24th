import { House } from "lucide-react";

export default function HomeIcon({ active = false }: { active?: boolean }) {
  if (!active) {
    return <House size={24} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />;
  }

  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className="shrink-0"
    >
      <path d="M10.1 3.2a3 3 0 0 1 3.8 0L20 8.3a3 3 0 0 1 1 2.3V19a2 2 0 0 1-2 2h-4v-6a3 3 0 0 0-6 0v6H5a2 2 0 0 1-2-2v-8.4a3 3 0 0 1 1-2.3Z" />
    </svg>
  );
}
