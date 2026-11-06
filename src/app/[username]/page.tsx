import { notFound } from "next/navigation";
import { posts } from "@/data/posts";
import { profiles } from "@/data/profiles";

export function generateStaticParams() {
  return profiles.map(({ username }) => ({ username }));
}

export default async function ProfilePage({
  params,
}: PageProps<"/[username]">) {
  const { username } = await params;
  const profile = profiles.find((profile) => profile.username === username);

  if (!profile) {
    notFound();
  }

  const profilePosts = posts.filter((post) => post.authorUsername === username);

  return (
    <section className="mx-auto max-w-4xl px-4 py-8 md:px-8 md:py-12">
      <header className="flex items-start gap-4 sm:gap-10">
        <div
          aria-hidden="true"
          className="grid size-16 shrink-0 place-items-center rounded-full bg-gray-100 text-xl font-semibold text-gray-500 sm:size-32 sm:text-3xl"
        >
          {profile.username[0].toUpperCase()}
        </div>

        <div className="min-w-0">
          <h1 className="break-all text-xl font-semibold">{profile.username}</h1>
          <p className="mt-2 text-sm font-semibold">{profile.displayName}</p>

          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm">
            <li>게시물 <strong>{profilePosts.length}</strong></li>
            <li>팔로워 <strong>{profile.followers}</strong></li>
            <li>팔로잉 <strong>{profile.following}</strong></li>
          </ul>

          <p className="mt-1 text-sm">{profile.bio}</p>
        </div>
      </header>

      <section aria-labelledby="posts-heading" className="mt-8 border-t border-gray-200">
        <h2 id="posts-heading" className="py-4 text-center text-sm font-semibold">
          게시물
        </h2>
        <ul role="list" className="grid grid-cols-3 gap-1">
          {profilePosts.map((post) => (
            <li
              key={post.id}
              className="aspect-square bg-gray-100"
            >
              <span className="sr-only">{post.title}</span>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
