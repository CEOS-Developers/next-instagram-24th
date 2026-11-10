import { getFeedPage } from "@/lib/data";

export async function GET(request: Request) {
  const offset = Number(new URL(request.url).searchParams.get("offset"));
  if (!Number.isSafeInteger(offset) || offset < 0) {
    return Response.json({ error: "잘못된 시작 위치입니다." }, { status: 400 });
  }
  return Response.json(getFeedPage(offset));
}
