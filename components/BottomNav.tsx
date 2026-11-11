import { Suspense } from "react";
import NavigationItems, { NavigationItemsFallback } from "./NavigationItems";

export default function BottomNav() {
  return (
    <nav
      aria-label="하단 내비게이션"
      className="sticky bottom-0 z-10 shrink-0 border-t border-foreground/15 bg-background pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <Suspense fallback={<NavigationItemsFallback variant="bottom" />}>
        <NavigationItems variant="bottom" />
      </Suspense>
    </nav>
  );
}
