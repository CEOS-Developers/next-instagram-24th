import Link from "next/link";

// notFound() 를 호출하거나 없는 주소로 들어오면 보여주는 페이지
export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold">죄송합니다. 페이지를 사용할 수 없습니다.</h1>
      <p className="text-neutral-600">
        클릭하신 링크가 잘못되었거나 페이지가 삭제되었습니다.
      </p>
      <Link href="/" className="font-semibold text-sky-600 hover:underline">
        홈으로 돌아가기
      </Link>
    </div>
  );
}
