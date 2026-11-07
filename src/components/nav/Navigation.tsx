"use client";

import { usePathname } from "next/navigation";

import NavigationView from "@/components/nav/NavigationView";
import type { User } from "@/types";

// 현재 주소(usePathname)를 읽어야 해서 Client Component 입니다.
// cacheComponents 가 켜져 있으면 usePathname 이 Suspense 를 요구할 수 있으므로
// layout.tsx 에서 <Suspense> 로 감싸 사용합니다.
export default function Navigation({ currentUser }: { currentUser: User }) {
  const pathname = usePathname();
  return <NavigationView currentUser={currentUser} pathname={pathname} />;
}
