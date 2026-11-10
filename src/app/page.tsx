import { notFound, redirect } from "next/navigation";
import { users } from "@/mocks/users";

export default function HomePage() {
  const user = users[0];

  if (!user) notFound();

  redirect(`/${encodeURIComponent(user.username)}`);
}
