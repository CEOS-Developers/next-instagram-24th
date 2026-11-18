import { defaultUsername } from "@/app/_lib/profile";
import { notFound } from "next/navigation";
import EmptyPosts from "../_components/EmptyPosts";

export default async function ReelsPage({ params }: PageProps<"/[username]/reels">) {
  const { username } = await params;
  if (username === defaultUsername) notFound();

  return <EmptyPosts>아직 릴스가 없어요.</EmptyPosts>;
}
