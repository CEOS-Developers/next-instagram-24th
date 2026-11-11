import Image from 'next/image';

export default function ProfileHighlights() {
  return (
    <section
      aria-label="스토리 하이라이트"
      className="mx-auto my-[32px] w-full max-w-[680px]"
    >
      <div className="w-[115px] px-[15px] py-[10px]">
        <button
          type="button"
          aria-label="새 하이라이트 만들기"
          className="flex w-[85px] cursor-pointer flex-col items-center text-[#f5f5f5]"
        >
          <span className="relative flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#25292e]">
            <Image
              src="/images/highlight-ring.png"
              alt=""
              width={87}
              height={87}
              className="pointer-events-none absolute top-1/2 left-1/2 h-[87px] w-[87px] max-w-none -translate-x-1/2 -translate-y-1/2"
            />
            <svg
              aria-hidden="true"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-[#737373]"
            >
              <path d="M21 11h-8V3a1 1 0 1 0-2 0v8H3a1 1 0 1 0 0 2h8v8a1 1 0 1 0 2 0v-8h8a1 1 0 1 0 0-2Z" />
            </svg>
          </span>
          <span className="w-full pt-[15px] text-center text-[12px] leading-[16px] font-semibold">
            New
          </span>
        </button>
      </div>
    </section>
  );
}
