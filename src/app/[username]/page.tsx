import { notFound } from "next/navigation";

const profile = {
  username: "jxx_gro_ovy",
  displayName: "홍진우",
  bio: "",
  posts: 6,
  followers: 422,
  following: 462,
};

export function generateStaticParams() {
  return [{ username: profile.username }];
}

export default async function ProfilePage({
  params,
}: PageProps<"/[username]">) {
  const { username } = await params;

  if (username !== profile.username) {
    notFound();
  }

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

          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm">
            <li>게시물 <strong>{profile.posts}</strong></li>
            <li>팔로워 <strong>{profile.followers}</strong></li>
            <li>팔로잉 <strong>{profile.following}</strong></li>
          </ul>

          <p className="mt-4 text-sm font-semibold">{profile.displayName}</p>
          <p className="mt-1 text-sm">{profile.bio}</p>
        </div>
      </header>
    </section>
  );
}
