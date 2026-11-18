import type { ReactNode } from "react";

export default function EmptyPosts({ children }: { children: ReactNode }) {
  return (
    <p className="px-4 py-8 text-center text-sm text-foreground/70">
      {children}
    </p>
  );
}
