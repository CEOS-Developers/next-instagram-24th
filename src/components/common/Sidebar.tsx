import Image from 'next/image';
import { Suspense } from 'react';

import {
  HeartIcon,
  HomeIcon,
  InstagramIcon,
  MessageIcon,
  MetaIcon,
  MoreIcon,
  PlusIcon,
  ReelsIcon,
  SearchIcon,
} from '@/components/icons';
import { currentUserId, users } from '@/data/users';

import SidebarLink, { SidebarItem } from './SidebarLink';

function ProfileImage({ src, active }: { src: string; active?: boolean }) {
  return (
    <Image
      src={src}
      alt=""
      width={24}
      height={24}
      className={`block size-6 rounded-full object-cover ${
        active ? 'ring-2 ring-ig-primary-text' : ''
      }`}
    />
  );
}

/*
 * 페이지 이동이 있는 메뉴.
 * Suspense로 감싸고, 그동안은 비활성 상태 모양을 보여준다.
 */
function NavLink(props: Parameters<typeof SidebarLink>[0]) {
  return (
    <Suspense fallback={<SidebarItem {...props} />}>
      <SidebarLink {...props} />
    </Suspense>
  );
}

export default function Sidebar() {
  const me = users.find((user) => user.id === currentUserId);

  return (
    <nav className="group fixed top-0 left-0 z-10 flex h-dvh w-18 flex-col overflow-hidden bg-ig-primary-background px-3 py-6 transition-[width] duration-200 ease-out hover:w-[238px] focus-within:w-[238px]">
      {/* 로고 */}
      <SidebarItem
        href="/"
        label="Instagram"
        icon={<InstagramIcon />}
        hideLabel
        fitContent
      />

      {/* 메인 메뉴 */}
      <div className="flex flex-1 flex-col justify-center">
        <NavLink
          href="/"
          label="홈"
          icon={<HomeIcon />}
          activeIcon={<HomeIcon filled />}
          fitContent
        />
        <SidebarItem label="릴스" icon={<ReelsIcon />} />
        <SidebarItem label="메시지" icon={<MessageIcon />} />
        <SidebarItem label="검색" icon={<SearchIcon />} />
        <SidebarItem label="알림" icon={<HeartIcon />} />
        <SidebarItem label="만들기" icon={<PlusIcon />} />
        {me && (
          <NavLink
            href={`/${me.username}`}
            label="프로필"
            icon={<ProfileImage src={me.profileImage} />}
            activeIcon={<ProfileImage src={me.profileImage} active />}
          />
        )}
      </div>

      {/* 하단 메뉴 */}
      <div className="flex flex-col">
        <SidebarItem label="더 보기" icon={<MoreIcon />} />
        <SidebarItem label="Meta의 다른 앱" icon={<MetaIcon />} />
      </div>
    </nav>
  );
}
