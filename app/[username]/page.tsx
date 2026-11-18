import { getProfilePage } from "@/data/posts";
import ProfilePostList from "./_components/ProfilePostList";

export default async function ProfilePostsPage({ params }: PageProps<"/[username]">) {
  const { username } = await params;
  return <ProfilePostList username={username} initialPage={getProfilePage(username, 0)} />;
}