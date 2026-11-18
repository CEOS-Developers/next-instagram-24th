import { getProfilePage } from "@/data/posts";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  const offset = Number(searchParams.get("offset") ?? 0);

  if (!username || !Number.isInteger(offset) || offset < 0) {
    return Response.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }


  await new Promise((resolve) => setTimeout(resolve, 800));

  return Response.json(getProfilePage(username, offset));
}