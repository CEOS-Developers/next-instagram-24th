import { io } from "next/cache";

export default async function PostDate({ publishedAt }: { publishedAt: string }) {
  await io();

  const date = new Date(publishedAt);
  const yearFormatter = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    timeZone: "Asia/Seoul",
  });
  const isCurrentYear =
    yearFormatter.format(date) === yearFormatter.format(new Date());
  const formattedDate = new Intl.DateTimeFormat("ko-KR", {
    year: isCurrentYear ? undefined : "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Seoul",
  }).format(date);

  return (
    <time dateTime={publishedAt} className="mt-1 block text-xs text-gray-500">
      {formattedDate}
    </time>
  );
}
