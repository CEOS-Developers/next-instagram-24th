import { notFound } from 'next/navigation';

import ProfileContent from '@/components/profile/ProfileContent';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileHighlights from '@/components/profile/ProfileHighlights';
import { posts } from '@/data/posts';
import { currentUserId, users } from '@/data/users';

interface ProfilePageProps {
  params: Promise<{ username: string }>;
}

export function generateStaticParams() {
  return users.map((user) => ({ username: user.username }));
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;
  const user = users.find((user) => user.username === username);

  if (!user) {
    notFound();
  }

  const userPosts = posts.filter((post) => post.authorId === user.id);
  const isOwnProfile = user.id === currentUserId;

  return (
    <div className="box-content mx-auto w-[74%] max-w-[1457px] px-[20px] pt-[30px]">
      <ProfileHeader
        user={user}
        postCount={userPosts.length}
        isOwnProfile={isOwnProfile}
      />
      {isOwnProfile && <ProfileHighlights />}
      <ProfileContent
        key={user.id}
        posts={userPosts}
        username={user.username}
        isOwnProfile={isOwnProfile}
        currentUserId={currentUserId}
        allPosts={isOwnProfile ? posts : []}
        authorUsernames={Object.fromEntries(
          users.map((item) => [item.id, item.username])
        )}
      />
    </div>
  );
}
