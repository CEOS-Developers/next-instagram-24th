import type { User } from '@/types/user';

export const currentUserId = 'user-1';

export const users: User[] = [
  {
    id: 'user-1',
    username: 'ahyun',
    name: '아현',
    profileImage: '/images/avatar-ahyun.jpg',
    bio: '일상을 기록합니다 📷',
    followersCount: 120,
    followingCount: 100,
  },
  {
    id: 'user-2',
    username: 'junggyu',
    name: '정규',
    profileImage: '/images/avatar-jeonggyu.jpg',
    bio: '반가워요!',
    followersCount: 150,
    followingCount: 110,
  },
];
