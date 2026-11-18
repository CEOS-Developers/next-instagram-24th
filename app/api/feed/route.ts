import { getFeedPage } from "@/data/posts";

// GET /api/feed?offset=5 → 5번째부터 다음 게시물
export async function GET(request: Request) {
  const offset = Number(new URL(request.url).searchParams.get("offset") ?? 0);

  if (!Number.isInteger(offset) || offset < 0) {
    return Response.json({ error: "잘못된 offset입니다." }, { status: 400 });
  }

  // 로딩 화면(스켈레톤)을 확인하려고 일부러 0.8초 늦게 보내기
  await new Promise((resolve) => setTimeout(resolve, 800));

  return Response.json(getFeedPage(offset));
}