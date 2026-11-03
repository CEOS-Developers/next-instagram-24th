import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-40 shrink-0 border-r border-gray-200 p-4 md:w-60 md:p-6">
      <Link href="/" className="text-2xl font-bold">
        Instagram
      </Link>

      <nav aria-label="주요 메뉴" className="mt-10">
        <Link
          href="/"
          className="block rounded-lg px-3 py-4 hover:bg-gray-100"
        >
          홈
        </Link>
      </nav>
    </aside>
  );
}