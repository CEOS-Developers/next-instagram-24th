import { notFound, redirect } from "next/navigation";
import { users } from "@/mocks/users";

// 화면 없이 리다이렉트하므로 instant UI 검증 대상에서 제외합니다.
export const instant = false;

export default function HomePage() {
  const user = users[0];

  if (!user) notFound();

  redirect(`/${encodeURIComponent(user.username)}`);
}
