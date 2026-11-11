"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { myPageHref, profileImage } from "@/app/_lib/profile";

type NavigationItem = {
  label: string;
  src: string;
  activeSrc?: string;
  href?: string;
};

const navigationItems = {
  home: {
    label: "홈",
    src: "/icons/home.svg",
    activeSrc: "/icons/home-filled.svg",
    href: "/",
  },
  reels: {
    label: "릴스",
    src: "/icons/reels.svg",
    activeSrc: "/icons/reels-filled.svg",
  },
  message: {
    label: "메시지",
    src: "/icons/message.svg",
    activeSrc: "/icons/message-filled.svg",
  },
  search: {
    label: "검색",
    src: "/icons/search-icon.svg",
    activeSrc: "/icons/search-icon-active.svg",
  },
  notifications: {
    label: "알림",
    src: "/icons/heart.svg",
    activeSrc: "/icons/heart-filled.svg",
  },
  create: {
    label: "만들기",
    src: "/icons/create.svg",
    activeSrc: "/icons/create-active.svg",
  },
  profile: {
    label: "내 프로필",
    src: profileImage,
    href: myPageHref,
  },
} satisfies Record<string, NavigationItem>;

type NavigationId = keyof typeof navigationItems;
type NavigationVariant = "bottom" | "sidebar";

const navigationOrder: Record<NavigationVariant, NavigationId[]> = {
  bottom: ["home", "search", "reels", "message", "profile"],
  sidebar: ["home", "reels", "message", "search", "notifications", "create", "profile"],
};

type NavigationProps = {
  variant: NavigationVariant;
};

function NavigationList({
  variant,
  activeItem,
}: NavigationProps & { activeItem?: NavigationId }) {
  return (
    <ul className={variant === "bottom" ? "flex justify-evenly" : "flex flex-col"}>
      {navigationOrder[variant].map((id) => {
        const item: NavigationItem = navigationItems[id];
        const isActive = id === activeItem;
        const isProfile = id === "profile";
        const image = (
          <Image
            src={isActive && item.activeSrc ? item.activeSrc : item.src}
            alt=""
            width={24}
            height={24}
            className={isProfile ? "size-6 rounded-full object-cover" : "size-6 dark:invert"}
          />
        );
        const icon = isProfile && isActive ? (
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full border-2 border-foreground">
            {image}
          </span>
        ) : image;
        const itemClassName = "box-border flex size-12 shrink-0 items-center justify-center p-3";

        return (
          <li
            key={id}
            className={variant === "bottom"
              ? `flex justify-center ${isProfile && isActive ? "w-7" : "w-6"}`
              : "my-1 flex justify-center"}
          >
            {item.href ? (
              <Link
                href={item.href}
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
                className={`${itemClassName} cursor-pointer`}
              >
                {icon}
              </Link>
            ) : (
              <button
                type="button"
                disabled
                aria-label={item.label}
                className={`${itemClassName} enabled:cursor-pointer disabled:cursor-not-allowed`}
              >
                {icon}
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function NavigationItemsFallback({ variant }: NavigationProps) {
  return <NavigationList variant={variant} />;
}

export default function NavigationItems({ variant }: NavigationProps) {
  const pathname = usePathname();
  const { username } = useParams<{ username?: string }>();
  const activeItem = username ? "profile" : navigationOrder.sidebar.find((id) => {
    const { href }: NavigationItem = navigationItems[id];
    return href && (pathname === href || (href !== "/" && pathname.startsWith(`${href}/`)));
  });

  return <NavigationList variant={variant} activeItem={activeItem} />;
}
