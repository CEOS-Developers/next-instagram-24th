import Image from "next/image";

export default function HomeHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-15 shrink-0 items-center justify-between bg-background px-4 md:hidden">
      <Image
        src="/icons/instagram-wordmark.svg"
        alt="Instagram"
        width={103}
        height={26}
        className="dark:invert"
      />
      <button
        type="button"
        disabled
        aria-label="알림"
        className="flex size-6 shrink-0 items-center justify-center enabled:cursor-pointer disabled:cursor-not-allowed"
      >
        <Image
          src="/icons/heart.svg"
          alt=""
          width={24}
          height={24}
          className="dark:invert"
        />
      </button>
    </header>
  );
}
